import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.eMIPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      description: 'A premium flagship smartphone with Pro-grade camera and performance.',
      variants: [
        {
          color: 'Silver',
          storage: '256GB',
          finish: 'Titanium',
          mrp: '1,27,400',
          sellingPrice: '1,19,900',
          imageUrl:
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
          emiPlans: [
            { tenureMonths: 3, interestRate: '0.00', monthlyPayment: '44,967', cashback: '7,500' },
            { tenureMonths: 6, interestRate: '8.50', monthlyPayment: '22,483', cashback: '5,000' },
            { tenureMonths: 12, interestRate: '10.25', monthlyPayment: '11,420', cashback: '2,500' },
            { tenureMonths: 24, interestRate: '10.50', monthlyPayment: '5,621', cashback: '7,500' },
            { tenureMonths: 36, interestRate: '10.50', monthlyPayment: '4,297', cashback: '7,500' },
            { tenureMonths: 48, interestRate: '10.50', monthlyPayment: '3,385', cashback: '7,500' },
            { tenureMonths: 60, interestRate: '10.50', monthlyPayment: '2,842', cashback: '7,500' },
          ],
        },
        {
          color: 'Orange',
          storage: '256GB',
          finish: 'Titanium',
          mrp: '1,27,400',
          sellingPrice: '1,19,900',
          imageUrl:
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80',
          emiPlans: [
            { tenureMonths: 3, interestRate: '0.00', monthlyPayment: '44,967', cashback: '6,500' },
            { tenureMonths: 6, interestRate: '8.50', monthlyPayment: '22,483', cashback: '4,500' },
            { tenureMonths: 12, interestRate: '10.25', monthlyPayment: '11,420', cashback: '2,000' },
            { tenureMonths: 24, interestRate: '10.50', monthlyPayment: '5,621', cashback: '7,500' },
            { tenureMonths: 36, interestRate: '10.50', monthlyPayment: '4,297', cashback: '7,500' },
            { tenureMonths: 48, interestRate: '10.50', monthlyPayment: '3,385', cashback: '7,500' },
            { tenureMonths: 60, interestRate: '10.50', monthlyPayment: '2,842', cashback: '7,500' },
          ],
        },
        {
          color: 'Deep Blue',
          storage: '512GB',
          finish: 'Titanium',
          mrp: '1,49,900',
          sellingPrice: '1,41,500',
          imageUrl:
            'https://images.unsplash.com/photo-1678667268678-3f53da35c41c?auto=format&fit=crop&w=1200&q=80',
          emiPlans: [
            { tenureMonths: 3, interestRate: '0.00', monthlyPayment: '52,607', cashback: '8,000' },
            { tenureMonths: 6, interestRate: '8.50', monthlyPayment: '26,325', cashback: '6,000' },
            { tenureMonths: 12, interestRate: '10.25', monthlyPayment: '13,365', cashback: '2,800' },
            { tenureMonths: 24, interestRate: '10.50', monthlyPayment: '6,593', cashback: '8,000' },
            { tenureMonths: 36, interestRate: '10.50', monthlyPayment: '5,042', cashback: '8,000' },
            { tenureMonths: 48, interestRate: '10.50', monthlyPayment: '3,973', cashback: '8,000' },
            { tenureMonths: 60, interestRate: '10.50', monthlyPayment: '3,336', cashback: '8,000' },
          ],
        },
      ],
    },
    {
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'AI-powered Samsung flagship built for productivity and photography.',
      variants: [
        {
          color: 'Titanium Gray',
          storage: '256GB',
          finish: 'Matte',
          mrp: '1,29,999',
          sellingPrice: '1,19,999',
          imageUrl:
            'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80',
          emiPlans: [
            { tenureMonths: 3, interestRate: '0.00', monthlyPayment: '45,000', cashback: '7,200' },
            { tenureMonths: 6, interestRate: '8.50', monthlyPayment: '22,500', cashback: '5,000' },
            { tenureMonths: 12, interestRate: '10.25', monthlyPayment: '11,400', cashback: '2,000' },
          ],
        },
        {
          color: 'Titanium Black',
          storage: '512GB',
          finish: 'Matte',
          mrp: '1,49,999',
          sellingPrice: '1,39,999',
          imageUrl:
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
          emiPlans: [
            { tenureMonths: 3, interestRate: '0.00', monthlyPayment: '52,500', cashback: '8,500' },
            { tenureMonths: 6, interestRate: '8.50', monthlyPayment: '26,250', cashback: '6,500' },
            { tenureMonths: 12, interestRate: '10.25', monthlyPayment: '13,275', cashback: '3,000' },
          ],
        },
      ],
    },
    {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      description: 'An elegant Android flagship with best-in-class computational photography.',
      variants: [
        {
          color: 'Obsidian',
          storage: '256GB',
          finish: 'Gloss',
          mrp: '1,09,999',
          sellingPrice: '99,999',
          imageUrl:
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
          emiPlans: [
            { tenureMonths: 3, interestRate: '0.00', monthlyPayment: '37,500', cashback: '5,500' },
            { tenureMonths: 6, interestRate: '8.50', monthlyPayment: '18,750', cashback: '4,000' },
            { tenureMonths: 12, interestRate: '10.25', monthlyPayment: '9,500', cashback: '1,700' },
          ],
        },
        {
          color: 'Porcelain',
          storage: '512GB',
          finish: 'Gloss',
          mrp: '1,29,999',
          sellingPrice: '1,19,999',
          imageUrl:
            'https://images.unsplash.com/photo-1601784551446-20c9e07db0eb?auto=format&fit=crop&w=1200&q=80',
          emiPlans: [
            { tenureMonths: 3, interestRate: '0.00', monthlyPayment: '45,000', cashback: '6,800' },
            { tenureMonths: 6, interestRate: '8.50', monthlyPayment: '22,500', cashback: '5,200' },
            { tenureMonths: 12, interestRate: '10.25', monthlyPayment: '11,400', cashback: '2,200' },
          ],
        },
      ],
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        description: product.description,
      },
    });

    for (const variant of product.variants) {
      const createdVariant = await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          color: variant.color,
          storage: variant.storage,
          finish: variant.finish,
          mrp: parseFloat(variant.mrp.replace(/,/g, '')),
          sellingPrice: parseFloat(variant.sellingPrice.replace(/,/g, '')),
          imageUrl: variant.imageUrl,
        },
      });

      await prisma.eMIPlan.createMany({
        data: variant.emiPlans.map((plan) => ({
          variantId: createdVariant.id,
          tenureMonths: plan.tenureMonths,
          interestRate: parseFloat(plan.interestRate),
          monthlyPayment: parseFloat(plan.monthlyPayment.replace(/,/g, '')),
          cashback: plan.cashback ? parseFloat(plan.cashback.replace(/,/g, '')) : null,
        })),
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Database seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
