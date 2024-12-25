import Image from 'next/image';
import Link from 'next/link';
import '../styles/product-card.css'

interface ProductCardProps {
  product: {
    sku: number;
    name: string;
    salePrice: number;
    regularPrice: number;
    onSale: boolean;
    image: string;
  };
}
const features = ["4K UHD", "Smart", "Voice Assist"]

export function ProductCard({ product }: ProductCardProps) {
  return (
      <div className="product-card">
        <div className="product-image-container">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
            className="product-image"
          />
          {product.onSale && <div className="sale-tag">On Sale</div>}
        </div>
        <div className="product-info">
          <div className="product_det">
            <div className="product-name">{product.name}</div>
            <div className="feature-tags">
              {features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
          </span>
        ))}
      </div>
            <div className='product_sku'>SKU : {product.sku}</div>
            <div className="actions">
                <label>
                  <input type="checkbox" /> Compare
                </label>
                <button className="save-button">❤️ Save</button>
            </div>
          </div>
          <div className="price-container">
            <span className="sale-price">${product.salePrice}</span>
            {product.onSale && (
              <span className="original-price">Was ${product.regularPrice}</span>
            )}
          <button className="add-to-cart-button">Add to Cart</button>

          </div>
        </div>
      </div>
  );
}
