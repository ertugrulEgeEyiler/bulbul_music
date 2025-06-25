import os
import json
from lxml import etree

# Klasörleri oluştur
os.makedirs("gitarlar", exist_ok=True)
os.makedirs("amfiler", exist_ok=True)
os.makedirs("davullar", exist_ok=True)
os.makedirs("diger_urunler", exist_ok=True)

# XML dosyasını oku
tree = etree.parse("urunler.xml")
root = tree.getroot()

# Ürün sayaçları
gitar_counter = 1
amfi_counter = 1
davul_counter = 1
diger_counter = 1

# Marka listeleri
GITAR_MARKALARI = ["ibanez", "jackson", "fender", "squier"]
AMFI_MARKALARI = ["boss", "ibanez", "marshall", "fender"]
DAVUL_MODELLERI = ["medeli mz520", "dd638dx"]

# İstatistikler için sayaçlar
istatistikler = {
    "gitarlar": 0,
    "amfiler": 0,
    "davullar": 0,
    "diger_urunler": 0,
    "gecersiz_fiyat": 0
}

def temizle(metin):
    """Metni temizler ve boş ise boş string döndürür"""
    return (metin or "").strip()

for urun in root.xpath('//urun'):
    # Temel ürün bilgilerini al
    marka = temizle(urun.findtext('marka')).lower()
    kategori = temizle(urun.findtext('kategoriadi')).lower()
    urun_adi = temizle(urun.findtext('urunkisaadi'))
    fiyat = temizle(urun.findtext('urunfiyati')) or "0"
    
    # Diğer ortak bilgiler
    kur = temizle(urun.findtext('kur'))
    stok = temizle(urun.findtext('stok'))
    resim1 = temizle(urun.findtext('urunbuyukresim'))
    resim2 = temizle(urun.findtext('urunbuyukresim2'))
    resim3 = temizle(urun.findtext('urunbuyukresim3'))
    aciklama_html = temizle(urun.findtext('urunuzunaciklama'))
    detay_url = temizle(urun.findtext('urunadresi'))
    
    # Fiyat kontrolü
    try:
        fiyat_int = int(fiyat)
        
        # Ürün kategorisi ve JSON hazırlama
        urun_json = {
            "urun_adi": urun_adi,
            "marka": temizle(urun.findtext('marka')),
            "kategori": temizle(urun.findtext('kategoriadi')),
            "fiyat": fiyat,
            "kur": kur,
            "stok": stok,
            "resimler": [resim1, resim2, resim3],
            "aciklama_html": aciklama_html,
            "detay_url": detay_url
        }
        
        # Ürün türüne göre işlem yap
        if any(m in marka for m in GITAR_MARKALARI) and "gitar" in kategori:
            if fiyat_int < 30000:  # Gitarlar için fiyat sınırı
                dosya_adi = f"gitarlar/gitar_{gitar_counter:03}.json"
                with open(dosya_adi, "w", encoding="utf-8") as f:
                    json.dump(urun_json, f, ensure_ascii=False, indent=2)
                
                print(f"✔ Gitar kaydedildi: {dosya_adi}")
                gitar_counter += 1
                istatistikler["gitarlar"] += 1
                
        elif any(m in marka for m in AMFI_MARKALARI) and "amfi" in kategori:
            # Amfiler için fiyat sınırı yok
            dosya_adi = f"amfiler/amfi_{amfi_counter:03}.json"
            with open(dosya_adi, "w", encoding="utf-8") as f:
                json.dump(urun_json, f, ensure_ascii=False, indent=2)
            
            print(f"✔ Amfi kaydedildi: {dosya_adi}")
            amfi_counter += 1
            istatistikler["amfiler"] += 1
            
        elif "davul" in kategori or any(model.lower() in urun_adi.lower() for model in DAVUL_MODELLERI):
            # Davullar için fiyat sınırı yok
            dosya_adi = f"davullar/davul_{davul_counter:03}.json"
            with open(dosya_adi, "w", encoding="utf-8") as f:
                json.dump(urun_json, f, ensure_ascii=False, indent=2)
            
            print(f"✔ Davul kaydedildi: {dosya_adi}")
            davul_counter += 1
            istatistikler["davullar"] += 1
            

            
    except ValueError:
        print(f"⚠ Fiyat sayı değil: {fiyat} → {urun_adi}")
        istatistikler["gecersiz_fiyat"] += 1

# İşlem sonuçları istatistiklerini yazdır
print("\n=== İŞLEM İSTATİSTİKLERİ ===")
print(f"Toplam işlenen ürün sayısı: {sum(istatistikler.values())}")
print(f"Gitarlar: {istatistikler['gitarlar']}")
print(f"Amfiler: {istatistikler['amfiler']}")
print(f"Davullar: {istatistikler['davullar']}")
print(f"Geçersiz fiyata sahip ürünler: {istatistikler['gecersiz_fiyat']}")
print("============================")
