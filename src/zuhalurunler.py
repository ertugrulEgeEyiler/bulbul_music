import os
import json
from lxml import etree

# Klasör oluştur
os.makedirs("gitarlar", exist_ok=True)

# DÜZGÜN XML dosyasını oku
tree = etree.parse("urunler.xml")
root = tree.getroot()

counter = 1

for urun in root.xpath('//urun'):
    marka = urun.findtext('marka') or ""
    kategori = urun.findtext('kategoriadi') or ""

    if "ibanez" in marka.strip().lower() and "gitar" in kategori.strip().lower():
        urun_adi = urun.findtext('urunkisaadi') or ""
        fiyat = urun.findtext('urunfiyati') or "0"
        kur = urun.findtext('kur') or ""
        stok = urun.findtext('stok') or ""
        resim1 = urun.findtext('urunbuyukresim') or ""
        resim2 = urun.findtext('urunbuyukresim2') or ""
        resim3 = urun.findtext('urunbuyukresim3') or ""
        aciklama_html = urun.findtext('urunuzunaciklama') or ""
        detay_url = urun.findtext('urunadresi') or ""

        try:
            if int(fiyat.strip()) < 30000:
                gitar_json = {
                    "urun_adi": urun_adi.strip(),
                    "marka": marka.strip(),
                    "kategori": kategori.strip(),
                    "fiyat": fiyat.strip(),
                    "kur": kur.strip(),
                    "stok": stok.strip(),
                    "resimler": [resim1.strip(), resim2.strip(), resim3.strip()],
                    "aciklama_html": aciklama_html.strip(),
                    "detay_url": detay_url.strip()
                }

                dosya_adi = f"gitarlar/gitar_{counter:03}.json"
                with open(dosya_adi, "w", encoding="utf-8") as f:
                    json.dump(gitar_json, f, ensure_ascii=False, indent=2)

                print(f"✔ Kaydedildi: {dosya_adi}")
                counter += 1

        except ValueError:
            print(f"⚠ Fiyat sayı değil: {fiyat.strip()} → {urun_adi}")
