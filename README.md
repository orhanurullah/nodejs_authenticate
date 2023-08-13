# Authentication and Authorization

passport.js veya diğer üçüncü parti paketleri kullanmadan kayıt ve yetkilendirme işlemi örneği. 
access_token, refresh_token, email verification gibi işlemler de yapılmıştır.
Api için Express, veritabanı için mongodb kullanılmıştır.

## Nasıl kullanılır?

Dosyayı makinenize indirdikten sonra 

    > npm init
    > npm install

komutlarını çalıştırın. Bu komutlar gerekli dosyaları npm paket yönetici aracılığıyla makinemize kuracaktır.

Bilgisayarınızda mongodb kurulu değilse [https://www.mongodb.com/cloud/atlas/register] adresinden ücretsiz bir şekilde kayıt olarak veritabanınızı kurabilirsiniz. Kurduğunuz veritabanının url adresi daha sonra kullanılacak.

Email doğrulama için google'ın gmail servisi kullanılacak. Bunun için google hesabında bazı ayarların yapılması gerekecek. Bunun için aşağıdaki linkte anlatıldığı gibi gerekli ayarları adım adım yapabilirsiniz. Buradan elde edeceğiniz uygulama şifresini bir yere kaydedin bunu .env dosyamızda bulundurmamız gerekecek.

 [https://miracleio.me/snippets/use-gmail-with-nodemailer] 

Daha sonra çalışma klasörünüzde .env dosyasını oluşturun ve içine uygulamanın ihtiyaç duyduğu aşağıdaki sabitleri tanımlayın.



    DB_HOST=localhost
    DB_PORT=27017
    DB_NAME=your-db-name
    APP_NAME='your-app-name'
    BASE_URL=http://localhost
    APP_PORT=3000 
    MONGO_URI='your-mongodb-url'
    PASSWORD_KEY=any-key/tvpJUTVkpCh5B3Jr9P6p6EXZoQ
    ACCESS_TOKEN_SECRET_KEY=any-key/5xwTFAOuIn5W4YP6bw9M/acXZ128RsJs39EF7mbX2yVi3qDMlXWsQ
    ACCESS_TOKEN_EXPIRES_IN="12h"
    REFRESH_TOKEN_SECRET_KEY=any-key/TrV34r+fhowj0ZmH6HnwbRT9OQ
    REFRESH_TOKEN_EXPIRES_IN="30d"
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER="google-email-addres"
    EMAIL_PASSWORD="google-email-password"
    EMAIL_SECRET_KEY=any-key/TIoFDXbKj73k2aew9AOuc1PwPbGGkQIc8m/uZnoNaWTw/70DFe6kwmZA1j4pNY6LjZ7qKZZSGCFZ9ewC0KDpHbPD+ksoQOGoK3twwbw9M/acXZ1
    EMAIL_KEY_EXPIRES_IN="6h"
    EMAIL_FROM="you-want-anywhere"
    ADMIN="your-email-address"
    ADMIN_ROLE="super-admin"
    SALT=10

bütün bunları yaptıktan sonra 
    > npm run dev

komutuyla uygulamamızı development ortamında çalıştırabiliriz.

## config 

Veri tabanı bağlantısı ve benzeri görevlerin yapıldığı dosyalar yer alır.

## controller

API isteklerinin yapıldığı, gerekli filtreleme ve işlemlerin yapıldığı iş katmanı yer alır.

## logger

Loglama işlemleri için gerekli ayarları yapıyoruz.

## middleware

Kısıtlama ve güvenlik işlemlerimizi yapıyoruz.

## model

Veritabanındaki tablolara karşılık gelen verilerimizi modelliyoruz.

## route

API çağrılarımızın yapılacağı rotalarımızı belirliyoruz.

## service

Veritabanı sorgularımızı iş katmanından ayırarak daha güvenli olması sebebiyle servis katmanında yapıyoruz.

## utils

Birden fazla yerde kullanılabilecek veya tek bir yerde kullanılacak fonksiyonlarımızı yazıp kullanacağımız yere çağırıyoruz.

## validation

Veritabanımıza herhangi bir ekleme yapılmadan önce verilerin tür ve içerik güvenliğini sağlamak amacıyla gelen verilerin kontrolünü yapıyoruz.