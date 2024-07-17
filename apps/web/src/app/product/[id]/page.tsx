import Container from '@/components/Container';
import { getProductByID } from '@/services/prouduct.service';
import ProductDetails from './ProductDetails';

interface IPrams {
  id?: number;
}

const Product = async ({ params }: { params: IPrams }) => {
  const productId = params?.id;
  if (!productId) {
    // handle the case where id is not present or is undefined
    throw new Error('Product ID is required');
  }
  const product = await getProductByID(productId);

  return (
    <div className="p-8">
      <ProductDetails product={product} />
    </div>
  );
};

export default Product;
