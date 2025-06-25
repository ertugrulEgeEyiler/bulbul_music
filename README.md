# Bülbül Music Web Store

Bülbül Music'in modern, kullanıcı dostu ve mobil uyumlu online mağaza uygulamasıdır. Gitarlar, amfiler ve davullar gibi ürün kategorilerini kolayca yönetebilir, ürün detaylarını görüntüleyebilir ve filtreleme yapabilirsiniz.

## Özellikler
- Kategori bazlı ürün listeleme (Gitarlar, Amfiler, Davullar)
- Marka ve fiyat aralığına göre filtreleme
- Her ürün için detay sayfası
- Responsive (mobil uyumlu) ve modern tasarım
- Görsel bulunmayan ürünler için otomatik placeholder
- Kolayca yeni kategori/ürün ekleme
- GoDaddy hosting ile tam uyumlu statik build

## Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadi/bulbul_music.git
   cd bulbul_music
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Gerekli ürün JSON dosyalarını** (`public/gitarlar/`, `public/amfiler/`, `public/davullar/`) ve görsel placeholder'ı (`public/pngs/image-placeholder.svg`) kontrol edin.

4. **Geliştirme ortamında çalıştırmak için:**
   ```bash
   npm start
   ```

5. **Prodüksiyon için build alın:**
   ```bash
   npm run build
   ```

6. **Build klasörünü test etmek için:**
   ```bash
   npx serve -s build
   # veya
   npm install -g serve
   serve -s build
   ```

## GoDaddy'ye Yükleme

1. `build` klasörünün içeriğini GoDaddy sunucunuzun web root dizinine (veya alt dizine) yükleyin.
2. `public/gitarlar/`, `public/amfiler/`, `public/davullar/` klasörlerindeki tüm ürün JSON dosyalarını da aynı yapıda sunucuya yükleyin.
3. Eğer siteyi bir alt dizinde yayınlayacaksanız, `package.json` dosyasındaki `homepage` alanını örneğin `"/music"` olarak güncelleyin ve tekrar build alın.

## Kategori ve Ürün Ekleme
- Yeni bir ürün eklemek için ilgili JSON dosyasını `public/gitarlar/`, `public/amfiler/` veya `public/davullar/` klasörüne ekleyin.
- Yeni bir kategori eklemek için benzer bir React component'i ve JSON klasörü oluşturun, ardından `Store.js` ve navigasyon bileşenine ekleyin.

## Kullanılan Teknolojiler
- React (Create React App)
- React Router
- Modern CSS (responsive tasarım)

## Geliştirici Notları
- Proje 2025 yılında güncellenmiştir.
- Tüm görseller ve ürün verileri statik olarak sunulmaktadır.
- Kodun tamamı GoDaddy gibi statik hostinglerde problemsiz çalışacak şekilde optimize edilmiştir.

---

Her türlü soru ve destek için info@bulbulmuzik.com adresine ulaşabilirsiniz.
