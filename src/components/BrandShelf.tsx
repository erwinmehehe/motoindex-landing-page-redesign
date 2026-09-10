import { motorcycleBrands, brandPath } from "../brands";
import { Container } from "./ui";
import Icon from "./icons";

export default function BrandShelf() {
  return (
    <section className="brand-shelf" id="proof" aria-labelledby="brand-shelf-title">
      <Container>
        <div className="brand-shelf-heading">
          <div><p className="page-eyebrow">Start with a name you know</p><h2 id="brand-shelf-title">Your favourite brands, properly researched.</h2></div>
          <a href="/brands" className="text-link">Browse all {motorcycleBrands.length} brands<Icon name="arrowRight" className="h-4 w-4" /></a>
        </div>
        <nav className="brand-shelf-links" aria-label="Featured motorcycle brands">
          {motorcycleBrands.slice(0, 6).map((brand) => (
            <a key={brand.slug} href={brandPath(brand)}>
              <span className={`brand-wordmark wordmark-${brand.slug}`}>{brand.name}</span>
              <span>Models, prices & buying guide<Icon name="arrowUpRight" className="h-3.5 w-3.5" /></span>
            </a>
          ))}
        </nav>
      </Container>
    </section>
  );
}