# Junior Academy --- AI yordamchi: to'liq User Story, biznes logika va ishlash mexanizmi

**Hujjat turi:** Product / Functional Specification\
**Mahsulot:** Junior Academy --- AI yordamchi\
**Versiya:** 1.0\
**Maqsad:** Dizayn rasmlarida ko'rsatilgan ekranlar va o'quvchi bosib
o'tadigan yo'lni ishlab chiqish uchun yagona manbaga jamlash.\
**Auditoriya:** Product Manager, dizayner, frontend, backend, AI/ML, QA
jamoalari.

------------------------------------------------------------------------

## 1. Mahsulot maqsadi

AI yordamchi o'quvchiga uy vazifasini rasm, screenshot yoki PDF
ko'rinishida yuklash, vazifani AI orqali tahlil qilish, aniqlangan
mavzuni tushunish, misollarni ko'rib chiqish va o'zi mustaqil yechish
imkonini beradi.

Yordamchi o'quvchining o'rniga barcha javoblarni shunchaki berib
qo'ymaydi. Asosiy yondashuv:

1.  Vazifani qabul qilish.
2.  Rasm/fayldan topshiriqlarni aniqlash.
3.  Sinf, fan va mavzuni taxmin qilish hamda ishonchlilik darajasini
    ko'rsatish.
4.  Mavzuni sodda tilda, vizual misollar bilan tushuntirish.
5.  Avval o'quvchiga mustaqil urinib ko'rish imkonini berish.
6.  Zarur bo'lsa maslahat va qadam-baqadam tushuntirish berish.
7.  Javobni tekshirish, natijani tushuntirish va rag'batlantirish.
8.  Keyingi misol, o'xshash misollar yoki yangi vazifaga o'tish imkonini
    berish.

## 2. Asosiy UX va navigatsiya talablari

### 2.1. Doimiy yuqori navbar

AI yordamchi sahifalarida Junior Academy'ning yuqori navbar'i saqlanadi.
Dizayn referensida quyidagilar bor:

-   Junior Academy logotipi.
-   "Dars jadvali".
-   "Coin tarixi".
-   Tajriba/energiya ko'rsatkichi.
-   Coin balansi.
-   Bildirishnomalar belgisi.
-   Profil belgisi.

Bu elementlar mavjud platforma dizayniga mos qolishi kerak. Ularning
mavjud funksiyasi platformadagi amaldagi xatti-harakatlarga muvofiq
ishlaydi.

### 2.2. "Ortga" havolasi

-   Sahifaning yuqori chap qismida **"Ortga"** havolasi qoladi.
-   Oldingi dizayn variantidagi chap tomondagi ortiqcha yon navigatsiya
    tugmalari olib tashlanadi.
-   AI yordamchi jarayonida alohida chap sidebar navigatsiyasi
    qo'shilmaydi.
-   "Ortga" bosilganda foydalanuvchi AI yordamchiga kirishdan oldingi
    tegishli sahifaga qaytadi. Jarayon ichida qaytish bo'lsa, iloji
    boricha avvalgi bosqich va kiritilgan ma'lumotlar saqlanadi.
-   Jarayon bosqichlari ko'rsatiladigan joyda quyidagi ketma-ketlik
    ishlatiladi: **1. Yuklash → 2. Tahlil → 3. Mini dars → 4. Yechish**.
    Faol bosqich vizual ajratiladi.

### 2.3. Til va yoshga mos interfeys

-   Matnlar o'zbek lotin yozuvida, sodda va o'quvchi yoshiga mos
    bo'lishi kerak.
-   AI tushuntirishlari qisqa, bosqichma-bosqich va ortiqcha murakkab
    terminlarsiz yoziladi.
-   Robot-mascot, ko'k asosiy tugmalar, yumshoq rangli kartalar, yengil
    soyalar va rag'batlantiruvchi vizual uslub dizayn referensiga mos
    saqlanadi.
-   Har bir asosiy harakatda tushunarli tugma nomi va natija bo'lishi
    kerak.

------------------------------------------------------------------------

## 3. O'quvchi yo'lining umumiy xaritasi

``` mermaid
flowchart TD
    A[Kurs sahifasi] --> B[AI yordamchi bannerini bosish]
    B --> C[AI yordamchi: vazifani yuklash]
    C --> D{Fayl yaroqlimi?}
    D -- Yo‘q --> E[Xatolik va qayta yuklash tavsiyasi]
    E --> C
    D -- Ha --> F[Fayl yuklandi]
    F --> G[AI tahlili]
    G --> H{Tahlil yetarlicha ishonchlimi?}
    H -- Yo‘q --> I[O‘quvchidan tasdiqlash yoki yaxshiroq rasm so‘rash]
    I --> G
    H -- Ha --> J[Topshiriqlar va mavzu aniqlanadi]
    J --> K[Mini dars: mavzuni tushunish]
    K --> L[Mavzu bo‘yicha misollar]
    L --> M[Qadam-baqadam yechim]
    M --> N[Mustaqil yechish]
    N --> O[O‘quvchi javob kiritadi]
    O --> P{Javob tekshirildimi?}
    P -- To‘g‘ri --> Q[To‘g‘ri javob va tushuntirish]
    P -- Noto‘g‘ri --> R[Muloyim feedback va maslahat]
    R --> S{O‘quvchi nima qiladi?}
    S -- Qayta urinadi --> N
    S -- Maslahat oladi --> T[Maslahat / qadam-baqadam yordam]
    T --> N
    Q --> U[Yakuniy rag‘bat va natijalar]
    U --> V{Keyingi harakat}
    V --> W[Yangi vazifa yuklash]
    V --> X[O‘xshash misollar]
    V --> Y[Boshqa mavzu]
    V --> Z[Jarayonni yakunlash]
```

**Muhim:** yuqoridagi xarita funksional yo'lni ifodalaydi. AI aniqlagan
mavzu yoki topshiriqlar noaniq bo'lsa, tizim noto'g'ri natijani qat'iy
fakt sifatida ko'rsatmasligi kerak.

------------------------------------------------------------------------

## 4. Ekranlar va har bir ekranning vazifasi

## Ekran 0. Kurs sahifasidagi AI yordamchi banneri

### Maqsad

O'quvchini AI yordamchi funksiyasiga olib kirish.

### UI elementlari

-   AI yordamchi banneri.
-   "Uyga vazifada yordam ol" kabi qisqa tavsif.
-   Beta belgisi, agar mahsulot hali beta holatida bo'lsa.
-   Banner bosiladigan interaktiv element bo'lishi kerak.

### User Story

**US-00:** O'quvchi sifatida uy vazifamni tushunish va yechishda yordam
olish uchun kurs sahifasidan AI yordamchini ochmoqchiman.

### Acceptance Criteria

-   Banner bosilganda AI yordamchi asosiy ekraniga o'tiladi.
-   Yuqori navbar saqlanadi.
-   AI yordamchi sahifasida "Ortga" havolasi mavjud bo'ladi.
-   Chap tomonda qo'shimcha navigatsiya paneli ko'rsatilmaydi.

------------------------------------------------------------------------

## Ekran 1. AI yordamchi --- vazifani yuklash

### Maqsad

O'quvchi vazifasini tizimga berishi va AI yordam jarayonini boshlashi.

### UI elementlari

-   Yuqori navbar va "Ortga".
-   Hero/banner: **"AI yordamchi --- Uyga vazifada yordam!"**
-   Qisqa izoh: vazifani yuklash, mavzuni tushunish va mustaqil
    yechishga urinish.
-   Jarayon bosqichlari: Yuklash → Tahlil → Mini dars → Yechish.
-   Yuklash zonasi.
-   "Fayl tanlash" tugmasi.
-   Drag-and-drop imkoniyati.
-   Qo'llab-quvvatlanadigan formatlar haqida matn: PDF, PNG, JPG yoki
    screenshot.
-   Rasm sifati bo'yicha maslahat.
-   Namuna vazifalar kartalari.
-   Oxirgi yuklangan vazifalar ro'yxati, agar bu ma'lumotlar mavjud
    bo'lsa.
-   O'ng tomonda "Qanday yordam beradi?" bosqichlari va AI yordamchi
    mascot'i.

### User Story

**US-01:** O'quvchi sifatida uy vazifamning rasmi yoki PDF faylini
yuklamoqchiman, shunda AI misollarni tahlil qilib, menga mos yordam bera
oladi.

### Asosiy mexanizm

1.  O'quvchi "Fayl tanlash" tugmasini bosadi yoki faylni yuklash
    zonasiga tashlaydi.
2.  Tizim fayl turi, hajmi va ochilishini tekshiradi.
3.  Yaroqli fayl tanlansa, yuklash holati ko'rsatiladi.
4.  Yuklash muvaffaqiyatli bo'lgach, fayl tahlilga yuboriladi.
5.  Tahlil bosqichiga o'tish yoki tahlil holatini ko'rsatish kerak.

### Xatolik holatlari

-   Qo'llab-quvvatlanmaydigan format: qo'llab-quvvatlanadigan
    formatlarni ko'rsatish.
-   Fayl hajmi limitdan katta: hajm limitini ko'rsatish va boshqa fayl
    tanlashni taklif qilish.
-   Fayl buzilgan yoki ochilmaydi: qayta yuklash tavsiyasi.
-   Internet yoki server xatosi: yuklash muvaffaqiyatsiz bo'lganini
    tushuntirish va qayta urinish tugmasi.
-   Rasm xira yoki matn o'qilmaydi: aniqroq rasm yuklash tavsiyasi.

### Acceptance Criteria

-   Fayl tanlash va drag-and-drop ishlaydi.
-   Yuklash vaqtida loading/progress holati ko'rinadi.
-   Foydalanuvchi fayl qabul qilinganini tushunadi.
-   Xatolik matni foydalanuvchiga nima qilish kerakligini aytadi.
-   Yaroqsiz fayl tahlilga yuborilmaydi.

------------------------------------------------------------------------

## Ekran 2. Fayl yuklangandan keyingi tahlil natijasi

### Maqsad

O'quvchiga yuklangan fayl qabul qilinganini va AI undan nimalarni
aniqlaganini ko'rsatish.

### UI elementlari

-   Yuqorida "Uyga vazifangiz yuklandi!" muvaffaqiyat banneri.
-   Fayl holati: yuklandi, fayl turi/hajmi va yuklangan vaqt kabi
    metama'lumotlar.
-   "Yuklangan rasm" kartasi:
    -   Rasm preview.
    -   "Rasmni kattalashtirish".
    -   "Yana bir rasm yuklash".
-   "AI tahlili" kartasi:
    -   Tahlil muvaffaqiyatli yoki muammo borligi.
    -   Aniqlangan sinf.
    -   Aniqlangan fan/mavzu.
    -   Ishonchlilik darajasi.
    -   "Mavzuni ko'rish" tugmasi.
-   "Topshiriqlar" ro'yxati:
    -   Har bir topshiriq raqami.
    -   Topshiriqning qisqa matni yoki ifodasi.
    -   Holati: hali boshlanmagan, tayyor, bajarilmoqda, bajarildi.
    -   Birinchi topshiriq uchun "Boshlash".
-   O'ng tomonda progress, bosqichlar, AI savol-javob bloki va maslahat.

### User Story

**US-02:** O'quvchi sifatida yuklagan rasmimni va AI aniqlagan mavzu
hamda topshiriqlarni ko'rmoqchiman, shunda tahlil to'g'ri ekanini
tekshirib, o'rganishni boshlay olaman.

### AI tahlili natijasida aniqlanishi mumkin bo'lgan ma'lumotlar

-   Fan.
-   Sinf.
-   Mavzu.
-   Topshiriqlar ro'yxati.
-   Har bir topshiriqning matni/ifodasi.
-   Topshiriqlarni yechish uchun mos tushuntirish turi.
-   Tahlil ishonchliligi yoki noaniqlik holati.

### Asosiy mexanizm

1.  AI yuklangan rasm/PDF matnini o'qiydi.
2.  Topshiriqlarni alohida elementlarga ajratadi.
3.  Fan, sinf va mavzuni aniqlashga harakat qiladi.
4.  Tizim natijani tahlil kartasi va topshiriqlar ro'yxatida ko'rsatadi.
5.  O'quvchi "Mavzuni ko'rish" yoki muayyan topshiriqni "Boshlash"
    orqali keyingi bosqichga o'tadi.

### Noaniqlik holati

-   Ishonchlilik past bo'lsa, sinf/mavzu aniq deb ko'rsatilmasin.
-   O'quvchidan mavzuni tasdiqlash yoki variantlardan tanlash so'ralishi
    mumkin.
-   Topshiriq matni o'qilmasa, aniqroq rasm yuklash tavsiya qilinadi.
-   Tizim rasmda yo'q topshiriqlarni o'zi to'qib chiqarmasligi kerak.

### Acceptance Criteria

-   Preview aynan o'quvchi yuklagan faylga mos bo'ladi.
-   Tahlil natijasi mavjud bo'lsa, sinf/mavzu/ishonchlilik ko'rsatiladi.
-   Har bir aniqlangan topshiriq ro'yxatda alohida ko'rsatiladi.
-   "Mavzuni ko'rish" tegishli mini darsni ochadi.
-   "Yana bir rasm yuklash" orqali yangi fayl yuklash mumkin.
-   Tahlil hali tugamagan bo'lsa, tayyor natija bor deb ko'rsatilmaydi.

------------------------------------------------------------------------

## Ekran 3. Mini dars --- mavzuni tushunish

### Maqsad

O'quvchiga aniqlangan mavzuni mustaqil misollarni yechishdan oldin
tushuntirish.

### UI elementlari

-   Yuqori navbar va "Ortga".
-   Jarayon bosqichlari, faol bosqich: **3. Mini dars**.
-   Mavzu nomi, masalan, "Qo'shish va ayirish".
-   Qisqa kirish matni.
-   Robot-mascot va tushuntiruvchi xabar.
-   Ichki bo'limlar/tablar:
    1.  Mavzuni tushunish.
    2.  Misollar bilan ko'rish.
    3.  Qadam-baqadam yechish.
    4.  Mustaqil yechish.
-   Vizual misollar.
-   "Eslab qoling!" maslahat kartalari.
-   Oldingi/keyingi navigatsiya.
-   Mini dars ichidagi progress indikatori.
-   "Keyingi: Misollar bilan ko'rish" yoki mos keyingi bosqich tugmasi.
-   O'ng tomonda mavzu bo'yicha bo'limlar progressi va AI savol berish
    maydoni.

### User Story

**US-03:** O'quvchi sifatida vazifamga tegishli mavzuni sodda
tushuntirish va ko'rgazmali misollar orqali o'rganmoqchiman, shunda
misollarni o'zim yechishga tayyor bo'laman.

### Mini dars tarkibi

Mini dars mavzuga qarab yaratiladi. Masalan, "Qo'shish va ayirish"
uchun:

**Qo'shish (+) nima?** - Ikki yoki bir nechta sonni birlashtirib, umumiy
miqdorni topish. - Masalan: 3 ta olma + 2 ta olma = 5 ta olma. - Vizual
ko'rsatish: 3 ta obyekt + 2 ta obyekt = 5 ta obyekt.

**Ayirish (−) nima?** - Bir sondan boshqa sonni ayirib, qancha qolganini
topish. - Masalan: 5 ta olma − 2 ta olma = 3 ta olma. - Vizual
ko'rsatish: 5 ta obyekt, ulardan 2 tasi olib tashlanadi, 3 tasi qoladi.

**Eslab qoling** - Qo'shishda natija odatda qo'shilayotgan miqdorlar
yig'indisidir. - Natural sonlar bilan boshlang'ich ayirishda natija
boshlang'ich sondan katta bo'lmaydi. - Qoidalar aynan o'quvchining sinfi
va mavzusiga mos bo'lishi kerak.

### Mexanizm

1.  AI tahlilidan kelgan mavzu mini dars kontentini belgilaydi.
2.  O'quvchi bo'limlarni navbat bilan ko'radi.
3.  Oldingi/keyingi tugmalari bilan bo'limlar orasida harakatlanadi.
4.  Mini darsdagi holat saqlanadi, shunda o'quvchi qaytib kelganda davom
    ettira oladi.
5.  O'quvchi "Misollar bilan ko'rish" bosqichiga o'tadi.

### Acceptance Criteria

-   Dars tahlilda aniqlangan mavzuga mos bo'ladi.
-   Matn, rasm va misollar bir-biriga zid bo'lmaydi.
-   Oldingi/keyingi navigatsiya ishlaydi.
-   Qaysi bo'limda ekanligi ko'rinadi.
-   O'quvchi yordam so'rashi mumkin, ammo yordam mustaqil fikrlashni
    qo'llab-quvvatlaydi.

------------------------------------------------------------------------

## Ekran 4. Misollarni AI bilan birgalikda yechish

### Maqsad

O'quvchiga yechimni tayyor javob sifatida emas, izohlangan qadamlar
orqali tushuntirish.

### UI elementlari

-   Sarlavha: "Misollarni birgalikda yechamiz".
-   Tablar:
    -   AI bilan yechish.
    -   O'xshash misollar.
    -   Mustaqil yechish.
-   Joriy misol raqami va ifoda, masalan, `2 + 3 = ?`.
-   Misollar orasida oldingi/keyingi boshqaruvi.
-   "AI yechimi va tushuntirish" kartasi.
-   Qadamlar:
    1.  Masalani tushunamiz.
    2.  Hisoblaymiz.
    3.  Natijani tekshiramiz.
-   Vizual tasvir.
-   Natija/to'g'ri javobni tushuntiruvchi blok.
-   "Boshqa usulda" va "Keyingi misol" tugmalari.
-   O'ng tomonda mavzudagi misollar ro'yxati va ularning holati.
-   AI savol-javob bloki.

### User Story

**US-04:** O'quvchi sifatida misol qanday yechilishini har bir qadam
bilan ko'rmoqchiman, shunda yechim usulini tushunib, o'xshash misolni
mustaqil yecha olaman.

### Mexanizm

1.  Tizim topshiriq yoki mavzuga mos namunaviy misolni ko'rsatadi.
2.  Misol bir necha tushunarli qadamga bo'linadi.
3.  Har bir qadam matn va mos vizual bilan izohlanadi.
4.  O'quvchi keyingi misolga o'tishi yoki boshqa usulni ko'rishi mumkin.
5.  O'quvchi tayyor bo'lsa, mustaqil yechish bosqichiga o'tadi.

### Acceptance Criteria

-   Har bir qadam mantiqan to'g'ri va ketma-ket bo'ladi.
-   Vizual misol matematik ifodaga mos keladi.
-   "Keyingi misol" boshqa misolni ochadi.
-   "Boshqa usulda" mavjud bo'lsa, ayni masala uchun boshqa
    tushuntirishni ko'rsatadi.
-   Misol holati (yechildi/yechilmoqda/yechilmagan) yangilanadi.
-   AI javobi noto'g'ri bo'lishi mumkin bo'lgan holatlarda tekshiruv va
    fallback mexanizmi ko'zda tutiladi.

------------------------------------------------------------------------

## Ekran 5. Mustaqil yechish

### Maqsad

O'quvchi bilimini tekshirish va uni o'zi javob topishga undash.

### UI elementlari

-   Sarlavha: "Endi sizning navbatingiz!".
-   Robot-mascot va mustaqil urinishga undovchi matn.
-   Misollar bo'yicha raqamli navigator.
-   Joriy misol raqami va topshiriq matni.
-   Masala ifodasi, masalan, `2 + 3 = ?`.
-   Javob kiritish maydoni.
-   Kerak bo'lsa raqamlar/matematik belgilar uchun virtual klaviatura.
-   "Keyinga saqlash" tugmasi.
-   "Maslahat so'rash" tugmasi.
-   "Qadam-baqadam yechim" tugmasi.
-   "Javobni tekshirish" yoki "Javobni yuborish" tugmasi.
-   O'ng tomonda progress va mavzudagi topshiriqlar holati.
-   AI savol-javob bloki.

### User Story

**US-05:** O'quvchi sifatida misolning javobini o'zim kiritib
tekshirtirmoqchiman, shunda mavzuni qanchalik tushunganimni bilaman.

### Javobni kiritish va tekshirish

1.  O'quvchi joriy topshiriqni ko'radi.
2.  Javob maydoniga qiymat kiritadi.
3.  "Javobni yuborish/tekshirish" tugmasini bosadi.
4.  Tizim bo'sh yoki yaroqsiz javobni tekshiradi.
5.  Javob tekshiruvga yuboriladi.
6.  Natija to'g'ri yoki noto'g'ri sifatida ko'rsatiladi.
7.  To'g'ri bo'lsa, muvaffaqiyat feedback'i va tegishli progress
    yangilanadi.
8.  Noto'g'ri bo'lsa, o'quvchi muloyim feedback oladi va qayta urinishi
    yoki yordam so'rashi mumkin.

### "Maslahat so'rash"

-   O'quvchiga to'liq javobni darhol ochmasdan, birinchi navbatda
    yo'naltiruvchi maslahat beriladi.
-   Maslahat o'quvchining joriy savoliga tegishli bo'lishi kerak.
-   Maslahatdan keyin o'quvchi yana mustaqil javob kiritishi mumkin.

### "Qadam-baqadam yechim"

-   O'quvchi qiyinlishsa, yechim qadamlarini ko'rishi mumkin.
-   Yechim tushuntiriladi; faqat javob raqamini chiqarish yetarli emas.
-   Yordamdan keyin o'quvchiga javobni qayta kiritish yoki o'xshash
    misolni mustaqil yechish taklif qilinadi.
-   Yordamdan foydalanish natijalar hisobotida alohida ko'rsatilishi
    mumkin.

### "Keyinga saqlash"

-   Joriy misol keyinga qoldiriladi.
-   Kiritilgan javob va holat yo'qolmasligi kerak.
-   O'quvchi boshqa misolga o'tib, keyin qaytishi mumkin.

### Javob formatini tekshirish

-   Bo'sh javob yuborilmasin.
-   Matnli javob kutilmaydigan matematik topshiriqda yaroqsiz format
    haqida tushunarli xabar ko'rsatilsin.
-   Matematik javoblarni tekshirishda formatlash farqlari (masalan,
    ortiqcha bo'sh joylar) sababli to'g'ri javob xato deb baholanmasin.
-   Ko'p yechimli topshiriqlar uchun qabul qilinadigan javoblar oldindan
    belgilanishi kerak.

### Acceptance Criteria

-   Javob maydoni klaviatura va zarur bo'lsa virtual klaviatura bilan
    ishlaydi.
-   Bo'sh javob yuborilmaydi.
-   To'g'ri/noto'g'ri natija aniq ko'rsatiladi.
-   Noto'g'ri javobda kamsituvchi yoki jazolovchi matn bo'lmaydi.
-   O'quvchi maslahat yoki qadam-baqadam yordam olishi mumkin.
-   Misollar orasida harakatlanganda javoblar va statuslar saqlanadi.
-   Topshiriqlar ro'yxatidagi statuslar haqiqiy holatga mos bo'ladi.

------------------------------------------------------------------------

## Ekran 6. Yakuniy natija va rag'bat

### Maqsad

O'quvchining yutug'ini ko'rsatish, o'rganishni davom ettirishga undash
va keyingi harakatni tanlash imkonini berish.

### UI elementlari

-   Katta muvaffaqiyat banneri: **"Zo'r ish!"**
-   Maqtov matni: "Siz misolni to'g'ri yechdingiz!"
-   Robot-mascot, kubok, yulduzlar yoki konfetti.
-   Qisqa ijobiy xabar.
-   Mukofot kartalari:
    -   Coin mukofoti.
    -   Tajriba/XP mukofoti.
    -   Bajarilgan topshiriqlar hisoblagichi.
-   Joriy misol, javob va to'g'ri/noto'g'ri belgisi.
-   "Tushuntirish" --- javob nima uchun to'g'ri ekanini qisqa izoh.
-   Vizual yechim, agar mavzu uchun mos bo'lsa.
-   "Yana misol yechishni xohlaysizmi?" bo'limi:
    -   **Yangi misol yuklash** --- rasm yoki PDF.
    -   **O'xshash misollar** --- shu mavzu doirasida mashq.
    -   **Boshqa mavzu** --- boshqa mavzu tanlash.
-   O'ng tomonda progress, bugungi natijalar va rag'batlantiruvchi
    maslahat.
-   AI savol-javob bloki.

### User Story

**US-06:** O'quvchi sifatida misolni to'g'ri yechganimdan keyin
natijamni, nima uchun javob to'g'ri ekanini va qanday rag'bat olganimni
ko'rmoqchiman, shunda o'qishni davom ettirishga motivatsiyam oshadi.

### Rag'batlantirish logikasi

Dizayn namunalarida quyidagi qiymatlar ko'rsatilgan: - `+10 coin` ---
to'g'ri javob uchun. - `+5 tajriba` --- faollik uchun. - Kunlik
bajarilgan topshiriqlar hisoblagichi, masalan `1/4`.

**Bular dizayndagi namunaviy qiymatlar; production uchun yakuniy mukofot
qoidalari product/loyiha sozlamalari bilan tasdiqlanishi kerak.**
Mukofotlar frontendda o'zboshimchalik bilan qo'shilmasligi, backenddagi
tasdiqlangan natija asosida berilishi kerak.

### Mexanizm

1.  Javob tekshiruvi natijasi saqlanadi.
2.  Tizim topshiriq statusini yangilaydi.
3.  Tegishli coin/XP qoidasi bo'yicha mukofot hisoblanadi.
4.  Mukofot bir hodisa uchun ikki marta berilmasligi kerak.
5.  Bugungi natijalar va umumiy progress yangilanadi.
6.  O'quvchiga maqtov va tushuntirish ko'rsatiladi.
7.  O'quvchi keyingi harakatni tanlaydi.

### Acceptance Criteria

-   To'g'ri javobdan keyin ijobiy feedback ko'rsatiladi.
-   Natija, izoh va vizual tushuntirish bir-biriga mos bo'ladi.
-   Coin/XP faqat tasdiqlangan qoida bo'yicha beriladi.
-   Sahifani qayta yuklash yoki tugmani qayta bosish bir xil mukofotni
    takroran bermaydi.
-   Progress hisoblagichi real bajarilgan ishga mos keladi.
-   "Yangi misol yuklash" yuklash ekraniga olib boradi.
-   "O'xshash misollar" shu mavzu bo'yicha mashqlarni ochadi.
-   "Boshqa mavzu" mavzu tanlash oqimiga olib boradi.

------------------------------------------------------------------------

## 5. Umumiy User Story ro'yxati

  -------------------------------------------------------------------------
  ID                      User Story              Asosiy natija
  ----------------------- ----------------------- -------------------------
  US-00                   Kurs sahifasidan AI     AI yordamchi ekrani
                          yordamchini ochish      ochiladi

  US-01                   Uy vazifasi faylini     Fayl qabul qilinadi va
                          yuklash                 tahlil boshlanadi

  US-02                   AI tahlili va           Sinf/mavzu/topshiriqlar
                          topshiriqlarni ko'rish  ko'rsatiladi

  US-03                   Mavzuni mini dars       O'quvchi asosiy qoidani
                          orqali o'rganish        tushunadi

  US-04                   Misolni qadam-baqadam   Yechish usuli
                          ko'rish                 tushuntiriladi

  US-05                   Misolni mustaqil        Javob tekshiriladi,
                          yechish                 feedback beriladi

  US-06                   Natija va rag'batni     Progress va mukofot
                          ko'rish                 yangilanadi

  US-07                   Maslahat olish          Yo'naltiruvchi yordam
                                                  ko'rsatiladi

  US-08                   Qadam-baqadam yordam    Yechim izoh bilan
                          olish                   ochiladi

  US-09                   Misolni keyinga         Holat va kiritilgan javob
                          qoldirish               saqlanadi

  US-10                   Yangi vazifa yuklash    Yangi vazifa uchun yangi
                                                  tahlil boshlanadi

  US-11                   O'xshash misollarni     Shu mavzudagi mashqlar
                          ishlash                 ochiladi

  US-12                   Boshqa mavzuni tanlash  Tanlangan mavzuga mos
                                                  dars ochiladi

  US-13                   Xatolikdan keyin        Qayta yuklash/urinish
                          tiklanish               yo'li mavjud

  US-14                   Jarayonni davom         Saqlangan bosqich va
                          ettirish                javoblarga qaytish mumkin
  -------------------------------------------------------------------------

------------------------------------------------------------------------

## 6. Holatlar va statuslar

### 6.1. Fayl statuslari

-   `selected` --- fayl tanlandi.
-   `uploading` --- yuklanmoqda.
-   `uploaded` --- yuklandi.
-   `upload_failed` --- yuklashda xatolik.
-   `processing` --- AI tahlili ketmoqda.
-   `processed` --- tahlil yakunlandi.
-   `needs_clarification` --- tahlilni tasdiqlash yoki aniqlashtirish
    kerak.
-   `processing_failed` --- tahlil amalga oshmadi.

### 6.2. Topshiriq statuslari

-   `not_started` --- boshlanmagan.
-   `ready` --- yechishga tayyor.
-   `in_progress` --- yechilmoqda.
-   `answered` --- javob yuborilgan.
-   `correct` --- to'g'ri yechilgan.
-   `incorrect` --- noto'g'ri javob berilgan.
-   `skipped` --- keyinga qoldirilgan.
-   `needs_help` --- yordam so'ralgan.
-   `completed` --- biznes qoidasi bo'yicha yakunlangan.

Statuslar UI'da o'zbekcha yorliqlar bilan ko'rsatiladi. Masalan,
`correct` → "Yechildi", `not_started` → "Yechilmagan", `in_progress` →
"Yechilmoqda".

### 6.3. Jarayon statuslari

-   `upload`
-   `analysis`
-   `mini_lesson`
-   `guided_practice`
-   `independent_practice`
-   `result`
-   `completed`

------------------------------------------------------------------------

## 7. Progress va hisob-kitoblar

Progress ko'rsatkichlari dizayndagi misol qiymatlar bilan qotirib
qo'yilmasligi kerak.

### 7.1. Topshiriqlar progressi

Agar progress topshiriqlar soniga asoslangan bo'lsa:

`Progress % = bajarilgan topshiriqlar / jami topshiriqlar × 100`

Masalan, 4 ta topshiriqdan 1 tasi bajarilgan bo'lsa, progress 25%
bo'ladi. Bu faqat misol; haqiqiy qiymat foydalanuvchining
topshiriqlariga qarab hisoblanadi.

### 7.2. Kunlik natijalar

Quyidagilar ko'rsatilishi mumkin: - To'g'ri javoblar soni. - Noto'g'ri
javoblar soni. - Sarflangan vaqt. - Bajarilgan topshiriqlar soni. -
Olingan coin/XP.

Vaqtni hisoblash qoidasi, jumladan pauza va sahifadan chiqib ketish
holati, implementatsiyadan oldin aniqlashtirilishi kerak.

### 7.3. Mukofotlar

-   Mukofotlar backend yoki markaziy mukofot qoidalari tomonidan
    tasdiqlanishi kerak.
-   Bir xil muvaffaqiyat hodisasi takroran yuborilsa, takroriy mukofot
    berilmasligi kerak.
-   Mukofot berilmasa, UI'da berildi deb ko'rsatilmasin.
-   Mukofot miqdori va qaysi harakatga berilishi sozlanadigan biznes
    qoida bo'lishi kerak.

------------------------------------------------------------------------

## 8. AI yordamchi chatining logikasi

Chat barcha tegishli bosqichlarda yordamchi element sifatida
ko'rsatilishi mumkin.

### User Story

**US-07:** O'quvchi sifatida tushunmagan joyim haqida savol berishni
xohlayman, shunda aynan qiyin bo'lgan qadamni tushunaman.

### Asosiy qoidalar

-   Savol joriy vazifa, mavzu va qadam kontekstida ko'rib chiqiladi.
-   Javob o'quvchining sinfiga mos, sodda va qisqa bo'ladi.
-   Mustaqil yechish ekranida birinchi javob sifatida to'liq yechim
    o'rniga maslahat berish afzal.
-   O'quvchi aniq "qadam-baqadam yechim"ni tanlasa, to'liqroq
    tushuntirish ko'rsatilishi mumkin.
-   Chat javob berayotganda loading holati ko'rinadi.
-   Bo'sh xabar yuborilmaydi.
-   Tarmoq/AI xatosida qayta urinish imkoniyati beriladi.
-   Chatdagi javoblar topshiriqning haqiqiy statusini o'z-o'zidan
    `correct` yoki `completed` holatiga o'zgartirmaydi.

------------------------------------------------------------------------

## 9. Muhim biznes qoidalari

1.  **Yuklangan fayl --- manba.** AI faqat faylda ko'rinadigan yoki
    foydalanuvchi tasdiqlagan topshiriqlar bilan ishlashi kerak.
2.  **Noaniqlik yashirilmasin.** Ishonchlilik past bo'lsa, tasdiqlash
    yoki qayta yuklash so'raladi.
3.  **O'quvchi mustaqilligi.** Avval mustaqil urinish, keyin maslahat,
    undan so'ng qadam-baqadam yordam taklif qilinadi.
4.  **Yordam va tekshiruv farqli.** Yechimni ko'rsatish javobni
    avtomatik ravishda o'quvchi mustaqil yechdi degani emas.
5.  **Javob tekshiruvi ishonchli bo'lishi kerak.** To'g'ri javobni
    aniqlash uchun masala turi va qabul qilinadigan format hisobga
    olinadi.
6.  **Mukofotlar serverda tasdiqlanadi.** Frontenddagi oddiy tugma
    bosilishi coin/XP berish uchun yetarli emas.
7.  **Idempotent mukofot.** Bitta natija uchun mukofot takroran
    berilmaydi.
8.  **Holat saqlanishi.** O'quvchi boshqa misolga o'tsa yoki sahifani
    tasodifan yangilasa, imkon qadar progress va javoblar saqlanadi.
9.  **Yangi vazifa --- yangi kontekst.** Yangi rasm yuklanganda eski
    topshiriqlar yangi vazifa sifatida ko'rsatilmasin; avvalgi vazifa
    tarixi saqlanishi mumkin.
10. **Boshqa mavzu.** Boshqa mavzuni tanlash joriy vazifani o'chirib
    yubormasligi kerak.
11. **Progress aniqligi.** Faqat belgilangan qoidaga mos yakunlangan
    topshiriqlar bajarilgan deb hisoblanadi.
12. **Responsive layout.** Asosiy desktop dizayn saqlanadi, kichik
    ekranlarda kartalar mantiqiy tartibda pastga tushadi; funksiyalar
    yo'qolmaydi.

------------------------------------------------------------------------

## 10. Xatolik va chekka holatlar (Edge Cases)

  -----------------------------------------------------------------------
  Holat                               Tizim xatti-harakati
  ----------------------------------- -----------------------------------
  Fayl formati noto'g'ri              Sabab va ruxsat etilgan formatlarni
                                      ko'rsatish

  Fayl hajmi katta                    Limitni ko'rsatish, qayta tanlash

  Rasm xira yoki kesilgan             Qayta suratga olish/yuklashni
                                      tavsiya qilish

  AI mavzuni aniqlay olmadi           Mavzuni tanlash yoki tahlilni qayta
                                      boshlash

  AI topshiriqni noto'g'ri ajratdi    O'quvchiga tuzatish/tasdiqlash
                                      yo'lini berish, agar scope'da
                                      mavjud bo'lsa

  Topshiriqlar topilmadi              Sababni ko'rsatish va qayta yuklash

  Tarmoq uzildi                       Jarayonni tiklash yoki qayta
                                      urinish

  O'quvchi javob kiritmadi            Tekshirishga yo'l qo'ymaslik

  Javob formati yaroqsiz              To'g'ri formatni ko'rsatish

  Javob noto'g'ri                     Muloyim feedback, qayta urinish,
                                      maslahat

  AI maslahat bera olmadi             Xatolikni ko'rsatish va qayta
                                      urinish yoki boshqa yordam usuli

  O'quvchi sahifani yangiladi         Saqlangan holat bo'lsa, shu
                                      bosqichni tiklash

  Tugma bir necha marta bosildi       Takroriy request/mukofotning oldini
                                      olish

  Mukofot servisi ishlamadi           Natijani yo'qotmaslik; mukofot
                                      statusini ishonchli qayta ishlash

  O'quvchi yangi vazifa yukladi       Yangi vazifa kontekstini ochish

  Barcha misollar bajarildi           Yakuniy natija va keyingi faoliyat
                                      variantlarini ko'rsatish
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 11. Ma'lumotlar modeli uchun minimal tushunchalar

Bu bo'lim aniq texnologik arxitekturani majburlamaydi; implementatsiya
jamoasi mavjud platforma arxitekturasiga moslashtiradi.

### HomeworkSession

-   Sessiya identifikatori.
-   O'quvchi identifikatori.
-   Yaratilgan vaqt.
-   Joriy bosqich.
-   Umumiy status.
-   Joriy mavzu.
-   Progress.

### UploadedFile

-   Fayl identifikatori.
-   HomeworkSession bilan bog'lanish.
-   Fayl manzili yoki saqlash identifikatori.
-   Fayl turi va hajmi.
-   Yuklash statusi.
-   Yuklangan vaqt.

### AnalysisResult

-   HomeworkSession bilan bog'lanish.
-   Aniqlangan fan.
-   Aniqlangan sinf.
-   Aniqlangan mavzu.
-   Ishonchlilik ko'rsatkichi.
-   Tahlil statusi.
-   Xatolik yoki aniqlashtirish sababi.

### Task

-   Topshiriq identifikatori.
-   HomeworkSession bilan bog'lanish.
-   Rasm/fayldan ajratilgan matn yoki ifoda.
-   Tartib raqami.
-   Topshiriq turi.
-   To'g'ri javob yoki tekshirish qoidasi.
-   Status.

### StudentAnswer

-   Topshiriq identifikatori.
-   O'quvchi kiritgan javob.
-   Tekshiruv natijasi.
-   Urinish raqami.
-   Yuborilgan vaqt.
-   Yordam ishlatilganligi, agar kuzatilsa.

### LessonContent / Explanation

-   Mavzu.
-   Tushuntirish bo'limlari.
-   Misollar.
-   Qadamlar.
-   Vizual elementlar yoki vizual ko'rsatma ma'lumotlari.
-   Sinfga moslik.

### RewardTransaction

-   O'quvchi identifikatori.
-   Sabab/hodisa identifikatori.
-   Coin/XP miqdori.
-   Berilgan vaqt.
-   Takroriy berishni oldini oluvchi yagona hodisa kaliti.
-   Status.

### ProgressSummary

-   Jami topshiriqlar.
-   Bajarilgan topshiriqlar.
-   To'g'ri/noto'g'ri javoblar.
-   Sarflangan vaqt.
-   Coin/XP yig'indisi.
-   Oxirgi yangilangan vaqt.

------------------------------------------------------------------------

## 12. QA uchun tekshiruv ro'yxati

### Yuklash

-   [ ] PDF yuklash ishlaydi.
-   [ ] JPG/PNG yuklash ishlaydi.
-   [ ] Drag-and-drop ishlaydi.
-   [ ] Noto'g'ri format rad etiladi.
-   [ ] Katta fayl uchun xabar ko'rsatiladi.
-   [ ] Yuklash loading/progress holati ko'rinadi.
-   [ ] Yuklash xatosidan keyin qayta urinish mumkin.

### Tahlil

-   [ ] Yuklangan rasm preview to'g'ri ko'rsatiladi.
-   [ ] Tahlil tugamaguncha natija tayyor deb ko'rsatilmaydi.
-   [ ] Sinf, mavzu va ishonchlilik ko'rsatiladi.
-   [ ] Topshiriqlar alohida ajratiladi.
-   [ ] Past ishonchlilik holati to'g'ri boshqariladi.
-   [ ] "Mavzuni ko'rish" mos mini darsni ochadi.
-   [ ] "Yana bir rasm yuklash" ishlaydi.

### Mini dars

-   [ ] Mavzu sarlavhasi tahlil natijasiga mos.
-   [ ] Bo'limlar orasida oldinga/orqaga o'tish mumkin.
-   [ ] Misollar va vizuallar izohga mos.
-   [ ] Mini dars progressi to'g'ri ko'rsatiladi.
-   [ ] Chatdan savol berish mumkin.

### Birgalikda yechish

-   [ ] Har bir qadam mantiqan to'g'ri.
-   [ ] Misollar orasida o'tish ishlaydi.
-   [ ] "Boshqa usulda" tugmasi ishlaydi.
-   [ ] Topshiriq statusi mos yangilanadi.

### Mustaqil yechish

-   [ ] Javob kiritish maydoni ishlaydi.
-   [ ] Bo'sh javob yuborilmaydi.
-   [ ] Yaroqsiz format tushunarli ko'rsatiladi.
-   [ ] To'g'ri javob to'g'ri deb baholanadi.
-   [ ] Noto'g'ri javob muloyim feedback oladi.
-   [ ] Maslahat so'rash ishlaydi.
-   [ ] Qadam-baqadam yordam ishlaydi.
-   [ ] Keyinga saqlash va boshqa misolga o'tish ishlaydi.
-   [ ] Javoblar qayta kirganda yo'qolmaydi.

### Yakuniy natija

-   [ ] To'g'ri javob uchun maqtov ko'rsatiladi.
-   [ ] Izoh javobga mos.
-   [ ] Coin/XP faqat tasdiqlangan qoidaga ko'ra beriladi.
-   [ ] Takroriy request mukofotni takroran bermaydi.
-   [ ] Progress va bugungi natijalar to'g'ri hisoblanadi.
-   [ ] Yangi vazifa yuklash ishlaydi.
-   [ ] O'xshash misollarni tanlash ishlaydi.
-   [ ] Boshqa mavzu tanlash ishlaydi.

### Umumiy UI

-   [ ] Navbar barcha tegishli ekranlarda saqlanadi.
-   [ ] "Ortga" havolasi mavjud.
-   [ ] Ortiqcha yon navigatsiya paneli yo'q.
-   [ ] Jarayon bosqichlari faol bosqichni ko'rsatadi.
-   [ ] Desktop va kichik ekranlarda kontentdan foydalanish mumkin.
-   [ ] Loading, empty, error va success holatlari mavjud.

------------------------------------------------------------------------

## 13. Analitika va mahsulot metrikalari

Quyidagi hodisalarni o'lchash tavsiya etiladi. Yakuniy event nomlari
mavjud analitika standartiga moslashtiriladi.

-   AI yordamchi banneri bosildi.
-   Yuklash oynasi ochildi.
-   Fayl tanlandi.
-   Fayl yuklash muvaffaqiyatli/yoki xato bilan yakunlandi.
-   AI tahlili boshlandi/yakunlandi/xato berdi.
-   Mavzu aniqligi tasdiqlandi yoki tuzatildi.
-   Mini dars boshlandi/tugallandi.
-   Birgalikda yechish bosqichi ochildi.
-   Mustaqil yechish boshlandi.
-   Javob yuborildi.
-   Javob to'g'ri/noto'g'ri.
-   Maslahat so'raldi.
-   Qadam-baqadam yordam ochildi.
-   Topshiriq keyinga qoldirildi.
-   Yakuniy ekran ko'rildi.
-   Mukofot berildi.
-   Yangi vazifa yuklandi.
-   O'xshash misollar tanlandi.
-   Boshqa mavzu tanlandi.

### Asosiy funnel

1.  Banner bosildi.
2.  Fayl muvaffaqiyatli yuklandi.
3.  Tahlil muvaffaqiyatli tugadi.
4.  Mini dars ochildi.
5.  Mustaqil yechish boshlandi.
6.  Kamida bitta javob tekshirildi.
7.  Vazifa yakunlandi.
8.  Keyingi faoliyat tanlandi.

Bu funnel qaysi bosqichda o'quvchilar chiqib ketayotganini aniqlashga
yordam beradi.

------------------------------------------------------------------------

## 14. Ishlab chiqish bo'yicha tavsiya etilgan ketma-ketlik

1.  Navbar, "Ortga" va umumiy sahifa skeletini yaratish.
2.  Fayl yuklash UI'si va fayl validatsiyasi.
3.  Upload statuslari va tahlil natijasi ekrani.
4.  Tahlil natijalarini topshiriqlar ro'yxatiga bog'lash.
5.  Mini dars bo'limlari va navigatsiyasi.
6.  AI bilan birgalikda yechish ekrani.
7.  Mustaqil yechish, javob kiritish va tekshirish.
8.  Natija, progress va mukofotlar.
9.  Chat, maslahat va qadam-baqadam yordam.
10. Xatolik holatlari, saqlash/davom ettirish va idempotent mukofot.
11. Analitika hodisalari.
12. QA va responsive tekshiruv.

Bu ketma-ketlik funksiyalarni kichik qismlarda tekshirish uchun
berilgan; jamoa amaldagi arxitektura va bog'liqliklarga qarab
vazifalarni parallel bajarishi mumkin.

------------------------------------------------------------------------

## 15. Ish boshlashdan oldin tasdiqlanishi kerak bo'lgan biznes qarorlari

Quyidagilar dizayn rasmlaridan to'liq aniqlanmaydi va kodda taxmin
sifatida qotirib qo'yilmasligi kerak:

1.  Faylning maksimal hajmi va PDF ichidagi sahifalar soni.
2.  AI tahlili ishonchliligining minimal chegarasi va tasdiqlash UX'i.
3.  O'quvchi AI aniqlagan topshiriq matnini tahrirlay oladimi.
4.  Qaysi fanlar va sinflar birinchi versiyada qo'llab-quvvatlanadi.
5.  Topshiriqni "bajarildi" deb hisoblash qoidasi: to'g'ri javobning
    o'zi yetarlimi yoki barcha topshiriqlarni bajarish kerakmi.
6.  Noto'g'ri javob uchun urinishlar soniga limit bormi.
7.  Maslahat va qadam-baqadam yordam mukofotga ta'sir qiladimi.
8.  Coin/XP miqdori va kunlik topshiriq hisoblagichining aniq qoidalari.
9.  Sarflangan vaqt hisobida pauza va sahifadan chiqish qanday
    hisoblanadi.
10. O'xshash misollar AI tomonidan dinamik yaratiladimi yoki
    tasdiqlangan kontent kutubxonasidan olinadimi.
11. Yangi vazifa yuklanganda avvalgi sessiya qayerda va qancha muddat
    saqlanadi.
12. O'quvchi javobini, yuklangan faylni va AI tahlilini qancha muddat
    saqlash kerak.
13. AI javobini tekshirish va matematik hisob-kitobni verifikatsiya
    qilish mexanizmi.
14. Mavzu mini darsi tayyor kontentdan olinadimi, AI tomonidan
    generatsiya qilinadimi yoki aralash usulda ishlaydimi.

------------------------------------------------------------------------

## 16. Yakuniy mahsulot qabul qilish mezonlari

Funksiya tayyor deb hisoblanishi uchun:

-   O'quvchi kurs sahifasidan AI yordamchiga kira oladi.
-   Rasm/PDF yuklay oladi va yuklash natijasini ko'radi.
-   AI tahlili orqali aniqlangan mavzu va topshiriqlarni ko'radi.
-   Mini darsni o'rganib, misollarni qadam-baqadam ko'ra oladi.
-   Mustaqil javob kiritib tekshirtira oladi.
-   Noto'g'ri javobdan keyin yordam yoki qayta urinish oladi.
-   To'g'ri javobdan keyin tushuntirish, natija va rag'bat ko'radi.
-   Yangi vazifa yuklash, o'xshash misollar yoki boshqa mavzuni tanlash
    mumkin.
-   Progress, statuslar va mukofotlar bir-biriga mos va takroriy
    hisoblanmaydi.
-   Yuklash, AI, tarmoq va javob tekshiruvi xatolaridan foydalanuvchi
    tushunarli yo'l bilan tiklana oladi.
-   Navbar va "Ortga" saqlanadi, ortiqcha yon navigatsiya
    ko'rsatilmaydi.
-   Asosiy user story'lar QA tomonidan tekshirilgan.

------------------------------------------------------------------------

**Hujjat yakuni.** Bu fayl AI yordamchining UX oqimi, user story'lari,
biznes logikasi, ekranlar, xatolik holatlari va QA mezonlari uchun
yagona boshlang'ich spetsifikatsiya hisoblanadi. Aniqlashtirilishi kerak
bo'lgan biznes qarorlari 15-bo'limda alohida ajratilgan.
