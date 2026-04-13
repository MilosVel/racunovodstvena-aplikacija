import { ContentLayout } from '@/components/layouts/content-layout';
import { ProductList } from '@/features/products/product-list';

export default function Home() {
    return (
        <ContentLayout>
            <p>Dobrodosli na nas sajt. Odaberite sta vam treba :)</p>
            <ProductList />
        </ContentLayout>
    );
}
