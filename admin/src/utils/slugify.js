export const slugifyPart = (str = '', options = {}) => {
    const { maxWords = null, maxLength = null } = options;

    let value = String(str ?? '').trim();

    if (maxWords) {
        value = value
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, maxWords)
            .join(' ');
    }

    value = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (maxLength && value.length > maxLength) {
        value = value
            .slice(0, maxLength)
            .replace(/-+$/g, '');
    }

    return value;
};


// Generate URL parts
export const generateSeoUrlParts = (
    category = '',
    subCategory = '',
    name = '',
    sku = ''
) => {

    const shortName = slugifyPart(name, {
        maxWords: 10,
        maxLength: 70,
    });

    return {
        categorySlug: slugifyPart(category),
        subCategorySlug: slugifyPart(subCategory),
        productSlug: shortName,
        skuSlug: slugifyPart(sku),
    };
};


// Generate complete product URL
export const getProductUrl = (
    category = '',
    subCategory = '',
    name = '',
    sku = ''
) => {

    const {
        categorySlug,
        subCategorySlug,
        productSlug,
        skuSlug,
    } = generateSeoUrlParts(
        category,
        subCategory,
        name,
        sku
    );

    return `/product/${categorySlug}/${subCategorySlug}/${productSlug}/${skuSlug}`;
};