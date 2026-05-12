import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/Products';
import { B2BPortalPage } from './pages/B2BPortal';
import { AboutPage } from './pages/About';
import { CertificationsPage } from './pages/Certifications';
import { ContactPage } from './pages/Contact';
import { LegalPage } from './pages/Legal';
import { CheckoutPage } from './pages/Checkout';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/b2b" element={<B2BPortalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
          <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
