# FadexShop

Giyim, ayakkabı ve aksesuar koleksiyonunu sergileyen örnek mağaza. React 19, React Router ve Vite ile hazırlanmıştır. Mevcut sayfa sırası ve ana yerleşim korunarak sıcak beyaz ve karamel-kahve teması sadeleştirildi.

## Yerel geliştirme

```sh
npm install
npm run dev
```

Terminalde yazan yerel adresi açın. Üretim çıktısı için:

```sh
npm run build
npm run preview
```

## İçerik ve görseller

Ürünler, bedenler, renkler ve fiyatlar `public/data/products.json` dosyasından gelir. Yeni ürün fotoğrafları `public/images/` altındadır. 12 ürün, 3 renk varyantı ve 5 editoryal sahne olmak üzere 20 görsel yerleşik Imagegen aracıyla üretildi. Üretim istemlerinin tamamı `public/images/generation-manifest.json` içinde kayıtlıdır. Kullanılan WebP dosyaları proje içindedir; harici fotoğraf sunucusu gerekmez.

Yazı tipleri `public/fonts/` üzerinden yüklenir. DM Sans ve Playfair Display lisansları aynı klasördedir. Tema değerleri `src/index.css` içindedir.

## Örnek mağaza davranışı

Kategori, ürün tipi, beden, renk ve fiyat filtreleri; sıralama; renk varyantları; beden seçimi; adet değiştirme ve sepetten kaldırma çalışır. Sepet bu tarayıcının yerel depolamasına kaydedilir. Gerçek ödeme, sipariş, bülten aboneliği veya müşteri hesabı bağlantısı yoktur. Bu durum arayüzde belirtilir.

Sağ alttaki WhatsApp düğmesi, önceki sürümdeki örnek numarayı (905551232345) kullanır. Gerçek bir mağazada yayınlamadan önce `.env.example` örneğinden `.env.local` oluşturup işletmenin numarasını `VITE_WHATSAPP_NUMBER` değişkenine yazın; ardından geliştirme sunucusunu yeniden başlatın.

## Hareket ve banner

Ana sayfa dört görsel arasında 6,5 saniyede bir, 1,4 saniyelik yumuşak geçiş yapar. Üzerine gelindiğinde, klavye odağı banner içindeyken ve sekme arka plandayken geçiş durur. Görsel noktaları ve duraklatma düğmesiyle kontrol edilebilir. Banner altındaki siyah duyuru bandı sağdan sola kesintisiz akar ve ayrıca duraklatılabilir.

Butonlar, ürün kartları, seçimler, sepet ve yardım alanlarında hafif hareket geri bildirimleri bulunur. Sisteminde hareketi azaltmayı seçen ziyaretçilerde otomatik banner, kayan yazı ve dekoratif animasyonlar varsayılan olarak durur. Alt bilgideki Animasyonlar kontrolüyle tüm hareketler açılıp kapatılabilir; seçim bu tarayıcıda saklanır. Banner veya kayan yazının oynat düğmesi de hareketi açabilir. Fiyat alanları yazıyla, klavyedeki oklarla veya özel artırma/azaltma düğmeleriyle kullanılabilir; düğmeler 50 TL adım uygular.

## Vercel

Mevcut Vercel projesinde Vite yapılandırması, `npm run build` ve çıktı klasörü olarak `dist` kullanılabilir. `vercel.json`, ürün ve alt sayfa adreslerine doğrudan gelen isteklerin React uygulamasına ulaşmasını sağlar. Bu revizyon yerel çalışma alanında hazırlanmıştır; otomatik Git push veya üretim yayını yapılmamıştır.
