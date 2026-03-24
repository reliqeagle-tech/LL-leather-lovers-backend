import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import { sendMail } from "./sendMail.js";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {

      const token = createToken(user._id)
      res.json({ success: true, token })

    }
    else {
      res.json({ success: false, message: 'Invalid credentials' })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// backend/controllers/userController.js


// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // From JWT middleware
//     const user = await userModel.findById(userId).select("-password");

//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     res.json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("getUserProfile error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update Profile (name/email)
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;  // From auth middleware
    const { name, email } = req.body;

    if (!name || !email) {
      return res.json({ success: false, message: "Name and email are required" });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ FIXED: Move this OUTSIDE the if block (proper indentation)
    res.json({ success: true, user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.json({ success: false, message: error.message || "Server error" });
  }
};


// Route for user register
// const registerUser = async (req, res) => {
//   try {

//     const { name, email, password } = req.body;

//     // checking user already exists or not
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User already exists" })
//     }

//     // validating email format & strong password
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Please enter a valid email" })
//     }
//     if (password.length < 8) {
//       return res.json({ success: false, message: "Please enter a strong password" })
//     }

//     // hashing user password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword
//     })

//     const user = await newUser.save()
//     // HTML Email Template with inline Tailwind-inspired styles
//     const htmlTemplate = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Welcome to Our Ecommerce Project</title>
//       </head>
//       <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
//         <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
//           <div style="text-align: center; padding: 20px 0; background-color: #4a5568; color: white;">
//             <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Welcome to Our Ecommerce Project!</h1>
//           </div>
//           <div style="padding: 30px 20px;">
//             <h2 style="font-size: 20px; color: #2d3748; margin-bottom: 10px;">Hi ${name},</h2>
//             <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
//               Thank you for registering with us! We're excited to have you join our community.
//             </p>
//             <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
//               We wish you'd like our products and services. Feel free to explore and shop with us!
//             </p>
//             <div style="text-align: center; margin-bottom: 30px;">
//               <a href="https://lethercult-e-commerce-app-frontend.vercel.app" style="display: inline-block; background-color: #4a5568; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
//                 Start Shopping
//               </a>
//             </div>
//             <p style="font-size: 14px; color: #718096; line-height: 1.5;">
//               If you have any questions, feel free to contact us at support@clothsy.com.
//             </p>
//             <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e2e8f0; margin-top: 30px;">
//               <p style="margin: 0; font-size: 14px; color: #718096;">
//                 Best regards,<br>
//                 The Our Clothsy Ecommerce Team
//               </p>
//             </div>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//     sendMail(email, "Welcome to Our Clothsy_TRENDS MEET TRUST", "", htmlTemplate)

//     const token = createToken(user._id)

//     res.json({ success: true, token })

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message })
//   }
// }






const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ── Check if user already exists ──
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // ── Validate email & password ──
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    // ── Hash password ──
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ── Save new user ──
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // ════════════════════════════════════════════════
    //  WELCOME EMAIL TEMPLATE  —  LL Leather Lovers
    // ════════════════════════════════════════════════
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>Welcome to LL Leather Lovers</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <style>
    @media only screen and (max-width:600px){
      .email-card { width:100% !important; }
      .hero-h1    { font-size:26px !important; }
      .hero-sub   { font-size:20px !important; }
      .pad        { padding-left:20px !important; padding-right:20px !important; }
      .code-txt   { font-size:19px !important; }
    }
  </style>
</head>

<body style="margin:0;padding:0;background-color:#07081a;font-family:'Jost',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  style="background:#07081a;padding:28px 12px;">
  <tr><td align="center">

  <!-- ░░ CARD ░░ -->
  <table class="email-card" role="presentation" width="600" cellpadding="0" cellspacing="0"
    style="max-width:600px;width:100%;background:#0d0e24;border:1px solid #252650;border-radius:8px;overflow:hidden;">

    <!-- TOP BAR -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,#5b4de8,#d4854a);font-size:0;line-height:0;">&nbsp;</td>
    </tr>

    <!-- ══ LOGO ══ -->
    <tr>
      <td class="pad" style="background:#0d0e25;padding:20px 36px;border-bottom:1px solid #1e1f40;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:12px;vertical-align:middle;">
            <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style="display:block;">
              <rect x="7" y="7" width="30" height="30" rx="2"
                    fill="#5b4de818" stroke="#5b4de8" stroke-width="2.2"
                    transform="rotate(45 22 22)"/>
              <text x="22" y="27" text-anchor="middle" font-family="Arial,sans-serif"
                    font-size="12" font-weight="800" fill="#5b4de8" letter-spacing="1.5">LL</text>
            </svg>
          </td>
          <td style="vertical-align:middle;">
            <div style="font-family:'Jost',Arial,sans-serif;font-size:20px;font-weight:700;color:#fff;line-height:1.1;">
              <span style="color:#5b4de8;">LL</span>&nbsp;Leather
            </div>
            <div style="font-size:9px;font-weight:500;letter-spacing:0.38em;color:#8080b8;text-transform:uppercase;margin-top:4px;">
              LOVERS
            </div>
          </td>
        </tr></table>
      </td>
    </tr>

    <!-- ══ HERO ══ -->
    <tr>
      <td class="pad"
        style="background:linear-gradient(165deg,#0f1030 0%,#13143e 55%,#0d0e24 100%);
               padding:50px 36px 38px;text-align:center;">

        <!-- Leather icon instead of tick -->
        <div style="width:64px;height:64px;background:#1a1c3a;border:2px solid #d4854a;
                    border-radius:50%;margin:0 auto 20px;text-align:center;line-height:60px;font-size:30px;">
          🎉
        </div>

        <p style="font-size:10px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;
                  color:#7b72f0;margin:0 0 12px;">
          ACCOUNT CREATED SUCCESSFULLY
        </p>

        <h1 class="hero-h1"
          style="font-family:'Cormorant Garamond',Georgia,serif;font-size:34px;
                 font-weight:700;line-height:1.3;color:#fff;margin:0 0 4px;">
          Hello, ${name}! 👋
        </h1>
        <h1 class="hero-sub"
          style="font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;
                 font-weight:600;font-style:italic;color:#d4854a;margin:0 0 20px;line-height:1.4;">
          You're officially part of the family
        </h1>

        <div style="width:44px;height:2px;background:linear-gradient(90deg,#5b4de8,#d4854a);margin:0 auto 22px;"></div>

        <p style="font-size:15px;font-weight:400;line-height:1.9;color:#d0d0e8;max-width:420px;margin:0 auto;">
          Your <strong style="color:#fff;font-weight:600;">LL Leather Lovers</strong> account is ready.<br/>
          Shop premium leather goods, track your orders, and enjoy
          <strong style="color:#fff;font-weight:600;">members-only deals</strong> — all in one place.
        </p>
      </td>
    </tr>

    <!-- ══ ACCOUNT DETAILS CARD ══ -->
    <tr>
      <td class="pad"
        style="background:linear-gradient(165deg,#0f1030 0%,#13143e 55%,#0d0e24 100%);
               padding:0 36px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="background:#12143a;border:1px solid #2e3070;border-radius:8px;">
          <tr>
            <td style="padding:24px 24px;">

              <p style="font-size:10px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;
                        color:#8888c0;margin:0 0 16px;text-align:center;">
                YOUR ACCOUNT DETAILS
              </p>

              <!-- Name row -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="margin-bottom:10px;">
                <tr>
                  <td style="padding:12px 16px;background:#0d0e24;border:1px solid #252548;border-radius:6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                      <td style="font-size:11px;font-weight:500;letter-spacing:0.12em;
                                 text-transform:uppercase;color:#6060a0;">Full Name</td>
                      <td align="right" style="font-size:14px;font-weight:600;color:#ffffff;">
                        ${name}
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>

              <!-- Email row -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="margin-bottom:10px;">
                <tr>
                  <td style="padding:12px 16px;background:#0d0e24;border:1px solid #252548;border-radius:6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                      <td style="font-size:11px;font-weight:500;letter-spacing:0.12em;
                                 text-transform:uppercase;color:#6060a0;">Email Address</td>
                      <td align="right" style="font-size:14px;font-weight:600;color:#7b72f0;">
                        ${email}
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>

              <!-- Status row -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 16px;background:#0d0e24;border:1px solid #252548;border-radius:6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                      <td style="font-size:11px;font-weight:500;letter-spacing:0.12em;
                                 text-transform:uppercase;color:#6060a0;">Account Status</td>
                      <td align="right">
                        <span style="display:inline-block;background:#0f2e1a;border:1px solid #2a7a4a;
                                     border-radius:20px;padding:3px 12px;font-size:12px;
                                     font-weight:600;color:#4caf82;letter-spacing:0.08em;">
                          ● &nbsp;Active
                        </span>
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══ WELCOME GIFT ══ -->
    <tr>
      <td class="pad"
        style="background:linear-gradient(165deg,#0f1030 0%,#13143e 55%,#0d0e24 100%);
               padding:0 36px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="background:#12143a;border:1px solid #3a3c78;border-radius:8px;">
          <tr>
            <td style="padding:26px 20px;text-align:center;">
              <p style="font-size:11px;font-weight:600;letter-spacing:0.24em;
                        text-transform:uppercase;color:#9090c8;margin:0 0 8px;">
                🎁 &nbsp;WELCOME GIFT — FIRST ORDER
              </p>
              <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:50px;
                           font-style:italic;font-weight:700;color:#6c62f0;line-height:1;">
                20% Off
              </div>
              <p style="font-size:14px;font-weight:400;color:#b0b0d4;margin:6px 0 18px;">
                Use the discount code below at checkout
              </p>
              <!-- Code box -->
              <div style="background:#07081a;border:2px dashed #5b4de8;border-radius:6px;
                          padding:14px 24px;display:inline-block;margin-bottom:10px;">
                <p style="font-size:11px;font-weight:500;letter-spacing:0.16em;color:#8888b8;
                          text-transform:uppercase;margin:0 0 5px;">Copy &amp; paste at checkout</p>
                <p class="code-txt"
                  style="font-size:24px;font-weight:700;letter-spacing:0.12em;color:#d4854a;margin:0;">
                  LLWELCOME20
                </p>
              </div>
              <p style="font-size:12px;font-weight:400;color:#7878a8;margin:4px 0 0;">
                Valid for 30 days &nbsp;&bull;&nbsp; One use per account
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══ CTA BUTTON ══ -->
    <tr>
      <td style="background:linear-gradient(165deg,#0f1030 0%,#13143e 55%,#0d0e24 100%);
                 padding:0 36px 44px;text-align:center;">
        <!-- Updated link to llleatherlovers.com/collection -->
        <a href="https://llleatherlovers.com/collection"
          style="display:inline-block;background:#5b4de8;color:#fff;
                 font-family:'Jost',Arial,sans-serif;font-size:13px;font-weight:600;
                 letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;
                 padding:16px 52px;border-radius:4px;">
          Start Shopping &rarr;
        </a>
        <p style="font-size:12px;font-weight:400;color:#8888b0;margin:10px 0 0;">
          Explore men's, women's &amp; full leather collection
        </p>
      </td>
    </tr>

    <!-- ══ DIVIDER ══ -->
    <tr>
      <td style="padding:0 36px;"><div style="border-top:1px solid #252548;"></div></td>
    </tr>

    <!-- ══ GET STARTED STEPS ══ -->
    <tr>
      <td class="pad" style="padding:32px 36px;">
        <p style="font-size:10px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;
                  color:#7878a8;text-align:center;margin:0 0 22px;">
          GET STARTED IN 3 EASY STEPS
        </p>

        <!-- Step 1 -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="background:#111230;border:1px solid #252548;border-radius:6px;margin-bottom:10px;">
          <tr>
            <td style="padding:16px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td width="40" valign="middle" style="padding-right:14px;">
                  <div style="width:34px;height:34px;background:#5b4de820;border:1px solid #5b4de8;
                              border-radius:50%;text-align:center;line-height:32px;
                              font-size:14px;font-weight:700;color:#7b72f0;">1</div>
                </td>
                <td valign="middle">
                  <div style="font-size:15px;font-weight:600;color:#fff;margin-bottom:4px;">
                    Browse the Collection
                  </div>
                  <div style="font-size:13px;font-weight:400;color:#c0c0d8;line-height:1.6;">
                    Explore our full range of men's &amp; women's premium leather products.
                  </div>
                </td>
              </tr></table>
            </td>
          </tr>
        </table>

        <!-- Step 2 -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="background:#111230;border:1px solid #252548;border-left:3px solid #5b4de8;
                 border-radius:6px;margin-bottom:10px;">
          <tr>
            <td style="padding:16px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td width="40" valign="middle" style="padding-right:14px;">
                  <div style="width:34px;height:34px;background:#5b4de820;border:1px solid #5b4de8;
                              border-radius:50%;text-align:center;line-height:32px;
                              font-size:14px;font-weight:700;color:#7b72f0;">2</div>
                </td>
                <td valign="middle">
                  <div style="font-size:15px;font-weight:600;color:#fff;margin-bottom:4px;">
                    Add Items to Your Cart
                  </div>
                  <div style="font-size:13px;font-weight:400;color:#c0c0d8;line-height:1.6;">
                    Pick what you love and add it to your bag — easy and quick.
                  </div>
                </td>
              </tr></table>
            </td>
          </tr>
        </table>

        <!-- Step 3 -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="background:#111230;border:1px solid #252548;border-radius:6px;">
          <tr>
            <td style="padding:16px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td width="40" valign="middle" style="padding-right:14px;">
                  <div style="width:34px;height:34px;background:#d4854a20;border:1px solid #d4854a;
                              border-radius:50%;text-align:center;line-height:32px;
                              font-size:14px;font-weight:700;color:#d4854a;">3</div>
                </td>
                <td valign="middle">
                  <div style="font-size:15px;font-weight:600;color:#fff;margin-bottom:4px;">
                    Apply Your 20% Discount
                  </div>
                  <div style="font-size:13px;font-weight:400;color:#c0c0d8;line-height:1.6;">
                    Use code <strong style="color:#d4854a;">LLWELCOME20</strong> at checkout
                    and enjoy your welcome gift.
                  </div>
                </td>
              </tr></table>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- ══ DIVIDER ══ -->
    <tr>
      <td style="padding:0 36px;"><div style="border-top:1px solid #252548;"></div></td>
    </tr>

    <!-- ══ FOOTER ══ -->
    <tr>
      <td class="pad" style="background:#0a0b20;padding:26px 36px;text-align:center;">

        <p style="font-size:10px;font-weight:500;letter-spacing:0.28em;text-transform:uppercase;
                  color:#5050a0;margin:0 0 16px;">
          LL LEATHER LOVERS &nbsp;&bull;&nbsp; PREMIUM SINCE 2020
        </p>

        <!-- Nav links — all with correct URLs -->
        <p style="margin:0 0 18px;">
          <a href="https://llleatherlovers.com/collection?category=Men"
            style="color:#7b72f0;text-decoration:none;font-family:'Jost',Arial,sans-serif;
                   font-size:13px;font-weight:500;margin:0 10px;">Men</a>
          <a href="https://llleatherlovers.com/collection?category=Women"
            style="color:#7b72f0;text-decoration:none;font-family:'Jost',Arial,sans-serif;
                   font-size:13px;font-weight:500;margin:0 10px;">Women</a>
          <a href="https://llleatherlovers.com/collection"
            style="color:#7b72f0;text-decoration:none;font-family:'Jost',Arial,sans-serif;
                   font-size:13px;font-weight:500;margin:0 10px;">Collection</a>
          <a href="https://llleatherlovers.com/contact"
            style="color:#7b72f0;text-decoration:none;font-family:'Jost',Arial,sans-serif;
                   font-size:13px;font-weight:500;margin:0 10px;">Contact</a>
        </p>

        <div style="border-top:1px solid #1e1f40;margin:0 0 16px;"></div>

        <p style="font-size:12px;font-weight:400;color:#9090b8;line-height:1.9;margin:0 0 6px;">
          This email was sent to
          <span style="color:#b0b0d8;font-weight:500;">${email}</span><br/>
          because you created an account at
          <a href="https://llleatherlovers.com"
            style="color:#7b72f0;text-decoration:none;font-weight:500;">llleatherlovers.com</a>
        </p>

        <!-- Updated support email — LL Leather Lovers -->
        <p style="font-size:12px;font-weight:400;color:#9090b8;margin:0 0 6px;">
          Need help? Email us at
          <a href="mailto:support@llleatherlovers.com"
            style="color:#7b72f0;text-decoration:none;font-weight:500;">
            support@llleatherlovers.com
          </a>
        </p>

        <p style="font-size:12px;font-weight:400;color:#9090b8;margin:0;">
          Didn't sign up for this account? &nbsp;
          <a href="https://llleatherlovers.com/contact"
            style="color:#d4854a;text-decoration:underline;font-weight:500;">Let us know</a>
        </p>

      </td>
    </tr>

    <!-- BOTTOM BAR -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,#d4854a,#5b4de8);font-size:0;line-height:0;">&nbsp;</td>
    </tr>

  </table>
  <!-- ░░ / CARD ░░ -->

  </td></tr>
</table>
</body>
</html>
    `;

    // ── Send welcome email ──
    sendMail(
      email,
      `Welcome to LL Leather Lovers, ${name}! 🖤 Your account is ready`,
      `Hi ${name}, your LL Leather Lovers account is ready! Use code LLWELCOME20 for 20% off your first order. Shop now: https://llleatherlovers.com/collection`,
      htmlTemplate
    );

    // ── Create token & respond ──
    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};





// Route for admin login
const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}
// send mail via frontend
// const frontendMail = async (req, res) => {
//   try {
//     const { email } = req.body;
//     await sendMail(
//       email,
//       "Welcome to Our Newsletter",
//       "Thank you for subscribing!",
//       "<h1>Thank you for subscribing!</h1>"
//     );
//     res.status(200).json({ success: true, message: "Mail sent successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// }




// ─────────────────────────────────────────────
//  LL Leather Lovers — Subscription Email
//  Uses: nodemailer (or your sendMail helper)
//  Styling: Tailwind-inspired inline CSS
// ─────────────────────────────────────────────

// const getSubscriptionEmailHTML = (email) => {
//   return `
// <!DOCTYPE html>
// <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
//   <title>Welcome to LL Leather Lovers</title>
//   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//   <!--[if mso]>
//   <noscript>
//     <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
//   </noscript>
//   <![endif]-->
// </head>

// <body style="margin:0;padding:0;background-color:#07081a;font-family:'Jost',sans-serif;-webkit-font-smoothing:antialiased;">

//   <!-- Outer wrapper -->
//   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#07081a;padding:40px 16px;">
//     <tr>
//       <td align="center">

//         <!-- Email Card -->
//         <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
//           style="max-width:620px;background-color:#0a0b1e;border:1px solid #1e1f3a;border-radius:4px;overflow:hidden;">

//           <!-- ── TOP GRADIENT BAR ── -->
//           <tr>
//             <td style="height:3px;background:linear-gradient(90deg,#5b4de8 0%,#d4854a 100%);font-size:0;line-height:0;">&nbsp;</td>
//           </tr>

//           <!-- ── HEADER / LOGO ── -->
//           <tr>
//             <td style="background-color:#0d0e22;padding:28px 48px;border-bottom:1px solid #1a1b35;">
//               <table role="presentation" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <!-- Diamond logo -->
//                   <td style="padding-right:14px;vertical-align:middle;">
//                     <div style="width:38px;height:38px;border:2px solid #5b4de8;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;">
//                       <span style="display:block;transform:rotate(-45deg);font-family:'Jost',sans-serif;font-weight:600;font-size:11px;color:#5b4de8;letter-spacing:0.05em;text-align:center;">LL</span>
//                     </div>
//                   </td>
//                   <!-- Brand name -->
//                   <td style="vertical-align:middle;">
//                     <div style="font-family:'Jost',sans-serif;font-weight:600;font-size:18px;letter-spacing:0.04em;color:#ffffff;line-height:1;">
//                       <span style="color:#5b4de8;">LL</span> Leather
//                     </div>
//                     <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:9px;letter-spacing:0.28em;color:#8888aa;text-transform:uppercase;margin-top:3px;">
//                       LOVERS
//                     </div>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── HERO ── -->
//           <tr>
//             <td style="background:linear-gradient(160deg,#0f1028 0%,#12132e 50%,#0a0b1e 100%);padding:56px 48px 44px;text-align:center;">
//               <!-- Eyebrow -->
//               <p style="font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.32em;text-transform:uppercase;color:#5b4de8;margin:0 0 20px;">
//                 EXCLUSIVE ACCESS &nbsp;·&nbsp; PREMIUM SINCE 2020
//               </p>
//               <!-- Headline -->
//               <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:40px;font-weight:400;line-height:1.2;color:#ffffff;margin:0;">
//                 Welcome to the
//                 <em style="color:#d4854a;font-style:italic;">Inner Circle</em>
//               </h1>
//               <!-- Divider -->
//               <div style="width:40px;height:2px;background:linear-gradient(90deg,#5b4de8,#d4854a);margin:24px auto;"></div>
//               <!-- Body -->
//               <p style="font-family:'Jost',sans-serif;font-size:15px;font-weight:300;line-height:1.8;color:#b0b0cc;max-width:420px;margin:0 auto;">
//                 You're now part of an exclusive community that gets first access to new leather
//                 arrivals, limited drops, and members-only offers — delivered straight to your inbox.
//               </p>
//             </td>
//           </tr>

//           <!-- ── OFFER BADGE ── -->
//           <tr>
//             <td style="padding:0 48px 40px;">
//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
//                 style="background:linear-gradient(135deg,#1a1b38 0%,#1e1f40 100%);border:1px solid #2e2f60;border-radius:3px;">
//                 <tr>
//                   <td style="padding:28px 24px;text-align:center;">
//                     <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:60px;font-style:italic;font-weight:600;color:#5b4de8;line-height:1;">
//                       20% Off
//                     </div>
//                     <div style="font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.3em;text-transform:uppercase;color:#8888aa;margin-top:6px;">
//                       YOUR FIRST ORDER
//                     </div>
//                     <div style="font-family:'Jost',sans-serif;font-size:13px;font-weight:400;color:#d4854a;margin-top:12px;letter-spacing:0.06em;">
//                       ✦ &nbsp;Use code: <strong>LLWELCOME20</strong> at checkout&nbsp; ✦
//                     </div>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── CTA BUTTON ── -->
//           <tr>
//             <td style="padding:0 48px 48px;text-align:center;">
//               <a href="https://llleatherlovers.com/collections"
//                 style="display:inline-block;background-color:#5b4de8;color:#ffffff;font-family:'Jost',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;text-decoration:none;padding:18px 48px;border-radius:2px;">
//                 SHOP THE COLLECTION
//               </a>
//             </td>
//           </tr>

//           <!-- ── DIVIDER ── -->
//           <tr>
//             <td style="padding:0 48px;">
//               <div style="border-top:1px solid #1a1b35;"></div>
//             </td>
//           </tr>

//           <!-- ── FEATURES (3 cards) ── -->
//           <tr>
//             <td style="padding:40px 48px 44px;">
//               <!-- Section title -->
//               <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:12px;font-weight:400;letter-spacing:0.22em;text-transform:uppercase;color:#8888aa;text-align:center;margin:0 0 28px;">
//                 Why LL Leather Lovers
//               </p>
//               <!-- Cards row -->
//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <!-- Card 1 -->
//                   <td width="31%" valign="top"
//                     style="background:#0f1028;border:1px solid #1a1b35;border-radius:3px;padding:18px 14px;text-align:center;">
//                     <div style="width:36px;height:36px;background:#1a1a2a;border:1px solid rgba(212,133,74,0.3);border-radius:4px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:16px;line-height:36px;">
//                       🛡
//                     </div>
//                     <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;font-weight:600;color:#ffffff;margin-bottom:6px;">
//                       Quality Assured
//                     </div>
//                     <div style="font-family:'Jost',sans-serif;font-size:11px;font-weight:300;color:#8888aa;line-height:1.6;">
//                       Every hide hand-selected &amp; inspected across multiple layers.
//                     </div>
//                   </td>
//                   <td width="4%"></td>
//                   <!-- Card 2 -->
//                   <td width="31%" valign="top"
//                     style="background:#0f1028;border:1px solid #2e2f60;border-top:2px solid #5b4de8;border-radius:3px;padding:18px 14px;text-align:center;">
//                     <div style="width:36px;height:36px;background:#1a1a2a;border:1px solid rgba(212,133,74,0.3);border-radius:4px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:16px;line-height:36px;">
//                       🚚
//                     </div>
//                     <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;font-weight:600;color:#ffffff;margin-bottom:6px;">
//                       Fast Delivery
//                     </div>
//                     <div style="font-family:'Jost',sans-serif;font-size:11px;font-weight:300;color:#8888aa;line-height:1.6;">
//                       Secure packaging with tracked shipping to your door.
//                     </div>
//                   </td>
//                   <td width="4%"></td>
//                   <!-- Card 3 -->
//                   <td width="31%" valign="top"
//                     style="background:#0f1028;border:1px solid #1a1b35;border-radius:3px;padding:18px 14px;text-align:center;">
//                     <div style="width:36px;height:36px;background:#1a1a2a;border:1px solid rgba(212,133,74,0.3);border-radius:4px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:16px;line-height:36px;">
//                       💬
//                     </div>
//                     <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;font-weight:600;color:#ffffff;margin-bottom:6px;">
//                       Support 24/7
//                     </div>
//                     <div style="font-family:'Jost',sans-serif;font-size:11px;font-weight:300;color:#8888aa;line-height:1.6;">
//                       Leather specialists available around the clock, always.
//                     </div>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── DIVIDER ── -->
//           <tr>
//             <td style="padding:0 48px;">
//               <div style="border-top:1px solid #1a1b35;"></div>
//             </td>
//           </tr>

//           <!-- ── FOOTER ── -->
//           <tr>
//             <td style="padding:30px 48px;text-align:center;">
//               <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:11px;font-weight:400;letter-spacing:0.3em;text-transform:uppercase;color:#3a3a5a;margin:0 0 14px;">
//                 LL LEATHER LOVERS &nbsp;·&nbsp; PREMIUM SINCE 2020
//               </p>
//               <p style="margin:0 0 14px;">
//                 <a href="#" style="color:#5b4de8;text-decoration:none;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.1em;margin:0 8px;">Men</a>
//                 <a href="#" style="color:#5b4de8;text-decoration:none;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.1em;margin:0 8px;">Women</a>
//                 <a href="#" style="color:#5b4de8;text-decoration:none;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.1em;margin:0 8px;">Collection</a>
//                 <a href="#" style="color:#5b4de8;text-decoration:none;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.1em;margin:0 8px;">Contact</a>
//               </p>
//               <p style="font-family:'Jost',sans-serif;font-size:10px;font-weight:300;color:#3a3a5a;line-height:1.8;margin:0;">
//                 This email was sent to <span style="color:#8888aa;">${email}</span> because you subscribed at llleatherlovers.com.<br/>
//                 No spam, ever. &nbsp;<a href="#" style="color:#5b4de8;text-decoration:underline;">Unsubscribe anytime.</a>
//               </p>
//             </td>
//           </tr>

//           <!-- ── BOTTOM GRADIENT BAR ── -->
//           <tr>
//             <td style="height:2px;background:linear-gradient(90deg,#d4854a 0%,#5b4de8 100%);font-size:0;line-height:0;">&nbsp;</td>
//           </tr>

//         </table>
//         <!-- /Email Card -->

//       </td>
//     </tr>
//   </table>

// </body>
// </html>
//   `.trim();
// };


// // ─────────────────────────────────────────────
// //  Controller
// // ─────────────────────────────────────────────
// const frontendMail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required." });
//     }

//     // Basic email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ success: false, message: "Invalid email format." });
//     }

//     await sendMail(
//       email,                                    // to
//       "Welcome to LL Leather Lovers 🖤",        // subject
//       `You're subscribed! Use LLWELCOME20 for 20% off your first order.`, // plain-text fallback
//       getSubscriptionEmailHTML(email)           // full HTML body
//     );

//     res.status(200).json({
//       success: true,
//       message: "Subscription confirmed. Welcome email sent successfully.",
//     });

//   } catch (error) {
//     console.error("[frontendMail] Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };





// ─────────────────────────────────────────────
//  LL Leather Lovers — Subscription Email
//  v3 Fix: contrast, simple language, footer
// ─────────────────────────────────────────────

const getSubscriptionEmailHTML = (email) => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>Welcome to LL Leather Lovers</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <style>
    @media only screen and (max-width: 600px) {
      .email-card  { width: 100% !important; }
      .hero-h1     { font-size: 28px !important; }
      .offer-pct   { font-size: 44px !important; }
      .pad-sides   { padding-left: 20px !important; padding-right: 20px !important; }
      .code-text   { font-size: 18px !important; }
    }
  </style>
</head>

<body style="margin:0;padding:0;background-color:#07081a;font-family:'Jost',Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  style="background-color:#07081a;padding:28px 12px;">
  <tr>
    <td align="center">

      <table class="email-card" role="presentation" width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;background-color:#0d0e24;border:1px solid #252650;border-radius:8px;overflow:hidden;">

        <!-- TOP BAR -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#5b4de8,#d4854a);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- ══ LOGO ══ -->
        <tr>
          <td class="pad-sides" style="background-color:#0d0e25;padding:22px 36px;border-bottom:1px solid #1e1f40;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;vertical-align:middle;">
                  <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                    <rect x="7" y="7" width="30" height="30" rx="2"
                          fill="#5b4de820" stroke="#5b4de8" stroke-width="2.2"
                          transform="rotate(45 22 22)"/>
                    <text x="22" y="27" text-anchor="middle"
                          font-family="Arial,sans-serif" font-size="12"
                          font-weight="800" fill="#5b4de8" letter-spacing="1.5">LL</text>
                  </svg>
                </td>
                <td style="vertical-align:middle;">
                  <div style="font-family:'Jost',Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.1;">
                    <span style="color:#5b4de8;">LL</span>&nbsp;Leather
                  </div>
                  <div style="font-family:'Jost',Arial,sans-serif;font-size:9px;font-weight:500;letter-spacing:0.38em;color:#8080b8;text-transform:uppercase;margin-top:4px;">
                    LOVERS
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ HERO ══ -->
        <tr>
          <td class="pad-sides"
            style="background:linear-gradient(165deg,#0f1030 0%,#13143e 55%,#0d0e24 100%);
                   padding:48px 36px 36px;text-align:center;">

            <p style="font-family:'Jost',Arial,sans-serif;font-size:10px;font-weight:600;
                      letter-spacing:0.28em;text-transform:uppercase;color:#7b72f0;margin:0 0 14px;">
              EXCLUSIVE ACCESS &nbsp;&bull;&nbsp; SINCE 2020
            </p>

            <!-- Simple, warm headline — no "Inner Circle" -->
            <h1 class="hero-h1"
              style="font-family:'Cormorant Garamond',Georgia,serif;font-size:36px;
                     font-weight:700;line-height:1.3;color:#ffffff;margin:0 0 6px;">
              You're Subscribed!
            </h1>
            <h1 class="hero-h1"
              style="font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;
                     font-weight:600;font-style:italic;line-height:1.3;
                     color:#d4854a;margin:0 0 14px;">
              Welcome to LL Leather Lovers
            </h1>

            <div style="width:44px;height:2px;background:linear-gradient(90deg,#5b4de8,#d4854a);margin:0 auto 22px;"></div>

            <!-- Very simple welcome message -->
            <p style="font-family:'Jost',Arial,sans-serif;font-size:15px;font-weight:400;
                      line-height:1.9;color:#d0d0e8;max-width:420px;margin:0 auto;">
              Thank you for subscribing! 🎉<br/>
              We will send you the <strong style="color:#ffffff;font-weight:600;">best leather deals</strong>,
              <strong style="color:#ffffff;font-weight:600;">new arrivals</strong>, and
              <strong style="color:#ffffff;font-weight:600;">special offers</strong>
              — right to your inbox. No spam, ever.
            </p>
          </td>
        </tr>

        <!-- ══ OFFER BOX ══ -->
        <tr>
          <td class="pad-sides"
            style="background:linear-gradient(165deg,#0f1030 0%,#13143e 55%,#0d0e24 100%);
                   padding:0 36px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="background:#12143a;border:1px solid #3a3c78;border-radius:8px;">
              <tr>
                <td style="padding:28px 20px;text-align:center;">

                  <p style="font-family:'Jost',Arial,sans-serif;font-size:11px;font-weight:600;
                            letter-spacing:0.24em;text-transform:uppercase;color:#9090c8;margin:0 0 8px;">
                    🎁 &nbsp;YOUR WELCOME GIFT
                  </p>

                  <div class="offer-pct"
                    style="font-family:'Cormorant Garamond',Georgia,serif;font-size:52px;
                           font-style:italic;font-weight:700;color:#6c62f0;line-height:1;">
                    20% Off
                  </div>

                  <p style="font-family:'Jost',Arial,sans-serif;font-size:14px;font-weight:400;
                            color:#b0b0d4;margin:6px 0 18px;">
                    on your first order — just use the code below
                  </p>

                  <!-- Coupon code — big, bold, obvious -->
                  <div style="background:#07081a;border:2px dashed #5b4de8;border-radius:6px;
                              padding:14px 24px;display:inline-block;margin-bottom:12px;">
                    <p style="font-family:'Jost',Arial,sans-serif;font-size:11px;font-weight:500;
                              letter-spacing:0.18em;color:#8888b8;text-transform:uppercase;margin:0 0 5px;">
                      Copy &amp; paste at checkout
                    </p>
                    <p class="code-text"
                      style="font-family:'Jost',Arial,sans-serif;font-size:24px;font-weight:700;
                             letter-spacing:0.12em;color:#d4854a;margin:0;">
                      LLWELCOME20
                    </p>
                  </div>

                  <p style="font-family:'Jost',Arial,sans-serif;font-size:12px;font-weight:400;
                            color:#7878a8;margin:4px 0 0;">
                    Valid for 30 days &nbsp;&bull;&nbsp; One use per customer
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ CTA BUTTON ══ -->
        <tr>
          <td style="background:linear-gradient(165deg,#0f1030 0%,#13143e 55%,#0d0e24 100%);
                     padding:0 36px 44px;text-align:center;">
            <a href="https://llleatherlovers.com/collection"
              style="display:inline-block;background-color:#5b4de8;color:#ffffff;
                     font-family:'Jost',Arial,sans-serif;font-size:13px;font-weight:600;
                     letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;
                     padding:16px 52px;border-radius:4px;">
              Shop Now &rarr;
            </a>
            <p style="font-family:'Jost',Arial,sans-serif;font-size:12px;font-weight:400;
                      color:#8888b0;margin:10px 0 0;">
              Browse men's, women's &amp; full leather collection
            </p>
          </td>
        </tr>

        <!-- ══ DIVIDER ══ -->
        <tr>
          <td style="padding:0 36px;">
            <div style="border-top:1px solid #252548;"></div>
          </td>
        </tr>

        <!-- ══ WHY CHOOSE US ══ -->
        <tr>
          <td class="pad-sides" style="padding:32px 36px;">

            <p style="font-family:'Jost',Arial,sans-serif;font-size:10px;font-weight:600;
                      letter-spacing:0.28em;text-transform:uppercase;color:#7878a8;
                      text-align:center;margin:0 0 20px;">
              WHAT YOU GET WITH US
            </p>

            <!-- Feature 1 -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="background:#111230;border:1px solid #252548;border-radius:6px;margin-bottom:10px;">
              <tr>
                <td style="padding:18px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="58" valign="top" style="padding-right:16px;">
                        <div style="width:48px;height:48px;background:#1a1c3a;
                                    border:1px solid #d4854a55;border-radius:8px;
                                    font-size:22px;text-align:center;line-height:48px;">🛡️</div>
                      </td>
                      <td valign="middle">
                        <div style="font-family:'Jost',Arial,sans-serif;font-size:16px;
                                    font-weight:600;color:#ffffff;margin-bottom:6px;">
                          Top Quality — Guaranteed
                        </div>
                        <div style="font-family:'Jost',Arial,sans-serif;font-size:13px;
                                    font-weight:400;color:#c0c0d8;line-height:1.7;">
                          Every leather item is carefully checked for quality,
                          strength, and finish before it is sent to you.
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Feature 2 -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="background:#111230;border:1px solid #252548;
                     border-left:3px solid #5b4de8;border-radius:6px;margin-bottom:10px;">
              <tr>
                <td style="padding:18px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="58" valign="top" style="padding-right:16px;">
                        <div style="width:48px;height:48px;background:#1a1c3a;
                                    border:1px solid #d4854a55;border-radius:8px;
                                    font-size:22px;text-align:center;line-height:48px;">🚚</div>
                      </td>
                      <td valign="middle">
                        <div style="font-family:'Jost',Arial,sans-serif;font-size:16px;
                                    font-weight:600;color:#ffffff;margin-bottom:6px;">
                          Fast &amp; Tracked Delivery
                        </div>
                        <div style="font-family:'Jost',Arial,sans-serif;font-size:13px;
                                    font-weight:400;color:#c0c0d8;line-height:1.7;">
                          We pack your order safely and ship it with tracking —
                          so you always know where it is.
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Feature 3 -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="background:#111230;border:1px solid #252548;border-radius:6px;">
              <tr>
                <td style="padding:18px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="58" valign="top" style="padding-right:16px;">
                        <div style="width:48px;height:48px;background:#1a1c3a;
                                    border:1px solid #d4854a55;border-radius:8px;
                                    font-size:22px;text-align:center;line-height:48px;">💬</div>
                      </td>
                      <td valign="middle">
                        <div style="font-family:'Jost',Arial,sans-serif;font-size:16px;
                                    font-weight:600;color:#ffffff;margin-bottom:6px;">
                          Help Available 24/7
                        </div>
                        <div style="font-family:'Jost',Arial,sans-serif;font-size:13px;
                                    font-weight:400;color:#c0c0d8;line-height:1.7;">
                          Have a question? Our team is always ready to help —
                          day or night, we reply within the hour.
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ══ DIVIDER ══ -->
        <tr>
          <td style="padding:0 36px;">
            <div style="border-top:1px solid #252548;"></div>
          </td>
        </tr>

        <!-- ══ FOOTER — high contrast, fully readable ══ -->
        <tr>
          <td class="pad-sides" style="background-color:#0a0b20;padding:26px 36px;text-align:center;">

            <!-- Brand line -->
            <p style="font-family:'Jost',Arial,sans-serif;font-size:10px;font-weight:500;
                      letter-spacing:0.28em;text-transform:uppercase;color:#6060a0;margin:0 0 14px;">
              LL LEATHER LOVERS &nbsp;&bull;&nbsp; PREMIUM SINCE 2020
            </p>

            <!-- Nav links — bright enough to read -->
            <p style="margin:0 0 16px;">
              <a href="#" style="color:#7b72f0;text-decoration:none;
                                 font-family:'Jost',Arial,sans-serif;font-size:13px;
                                 font-weight:500;margin:0 10px;">Men</a>
              <a href="#" style="color:#7b72f0;text-decoration:none;
                                 font-family:'Jost',Arial,sans-serif;font-size:13px;
                                 font-weight:500;margin:0 10px;">Women</a>
              <a href="#" style="color:#7b72f0;text-decoration:none;
                                 font-family:'Jost',Arial,sans-serif;font-size:13px;
                                 font-weight:500;margin:0 10px;">Collection</a>
              <a href="#" style="color:#7b72f0;text-decoration:none;
                                 font-family:'Jost',Arial,sans-serif;font-size:13px;
                                 font-weight:500;margin:0 10px;">Contact</a>
            </p>

            <!-- Divider -->
            <div style="border-top:1px solid #1e1f40;margin:0 0 16px;"></div>

            <!-- Legal text — visible gray, not near-black -->
            <p style="font-family:'Jost',Arial,sans-serif;font-size:12px;font-weight:400;
                      color:#9090b8;line-height:1.9;margin:0;">
              This email was sent to
              <span style="color:#b0b0d8;font-weight:500;">${email}</span><br/>
              because you subscribed at
              <a href="https://llleatherlovers.com"
                style="color:#7b72f0;text-decoration:none;font-weight:500;">llleatherlovers.com</a>
            </p>
            <p style="font-family:'Jost',Arial,sans-serif;font-size:12px;font-weight:400;
                      color:#9090b8;margin:8px 0 0;">
              No spam, ever. &nbsp;
              <a href="#" style="color:#d4854a;text-decoration:underline;font-weight:500;">
                Unsubscribe anytime
              </a>
            </p>

          </td>
        </tr>

        <!-- BOTTOM BAR -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#d4854a,#5b4de8);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
  `.trim();
};


// ─────────────────────────────────────────────
//  Controller
// ─────────────────────────────────────────────
const frontendMail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    await sendMail(
      email,
      "Welcome to LL Leather Lovers — Here's your 20% off 🖤",
      `Thanks for subscribing! Use code LLWELCOME20 for 20% off your first order at llleatherlovers.com. Valid for 30 days.`,
      getSubscriptionEmailHTML(email)
    );

    res.status(200).json({
      success: true,
      message: "Subscription confirmed. Welcome email sent successfully.",
    });

  } catch (error) {
    console.error("[frontendMail] Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};






export const userAvatarController = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // ✅ Step 1: Delete OLD avatar from Cloudinary BEFORE uploading new one
    if (user.avatar) {
      try {
        const urlParts = user.avatar.split("/");
        const uploadIndex = urlParts.indexOf("upload");
        const publicIdWithExt = urlParts.slice(uploadIndex + 2).join("/");
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

        console.log("🗑️ Deleting old avatar:", publicId);
        const deleteResult = await cloudinary.uploader.destroy(publicId);
        console.log("🗑️ Delete result:", deleteResult); // should log { result: 'ok' }
      } catch (e) {
        console.log("Old avatar delete failed:", e.message);
      }
    }

    // ✅ Step 2: Upload NEW avatar
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "avatar" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    };

    const result = await uploadFromBuffer(req.files[0].buffer);
    // const result = await uploadFromBuffer(req.file.buffer);

    // ✅ Step 3: Save NEW avatar URL to database
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error("Avatar Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const removeImageFromCloudinary = async (req, res) => {
  try {
    const imgUrl = req.query.img;

    if (!imgUrl || typeof imgUrl !== "string") {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    // ✅ Correctly extract public_id including folder
    // URL: https://res.cloudinary.com/xxx/image/upload/v123456/avatar/filename.jpg
    // public_id needed: "avatar/filename"
    const urlParts = imgUrl.split("/");
    const uploadIndex = urlParts.indexOf("upload");
    const publicIdWithExt = urlParts.slice(uploadIndex + 2).join("/");
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove extension

    console.log("Deleting from Cloudinary, public_id:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.status(400).json({
        success: false,
        message: "Failed to delete image",
        result,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from auth middleware
    const { name, mobile } = req.body; // only name & mobile from frontend

    const userExist = await userModel.findById(userId);
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { name, mobile },
      { new: true }
    );

    return res.json({
      success: true,
      message: "User updated successfully",
      user: {
        name: updateUser?.name,
        _id: updateUser?._id,
        email: updateUser?.email,
        mobile: updateUser?.mobile,
        avatar: updateUser?.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};



// forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = verifyCode;
    user.otpExpires = Date.now() + 600000;
    await user.save();

    await sendEmailFun({
      sendTo: email,
      subject: "Verify email from DDolly Lamb",
      text: "",
      html: verificationEmail(user.name, verifyCode),
    });

    return res.json({
      message: "check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};



export { loginUser, registerUser, adminLogin, frontendMail }