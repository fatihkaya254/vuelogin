<template lang="pug">
div
    .top
      Navbar
    .terms
        h1 {{title}}
        p(v-for="t in terms") {{t}}
    footer
      Footer
</template>

<script>
import Footer from "@/components/footer.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      title: "Kullanıcı Sözleşmesi ve Kullanım Şartları",
      terms: [
        "Madde 1.   Bu sayfada paylaşılan kullanıcı sözleşmesi ve Sitede paylaşılan diğer kurallar izders.com tarafından sunulan hizmetlere ilişkin şart ve koşulları ve sitenin kullanılmasına ilişkin kuralları düzenlemektedir. Kullanıcının, Siteden yararlanmaya başladığı andan itibaren veya telefon, form, e-posta, canlı destek yoluyla bilgi almaya başlamasının ve Ders Talebi bulunmasının ardından bu Sözleşmeyi onayladığını taahhüt ettiği kabul edilir. Bu sayfada veya farklı sayfalarda paylaşılan kurallar ve şartların sizin için uygun olmadığını düşünüyorsanız lütfen siteyi kullanmayınız.",
        "Madde 2.   izders.com ihtiyaç duyulduğunda sözleşmeyi tek taraflı olarak değiştirme ya da düzenleme hakkına sahiptir. Kullanıcı sözleşmesi değiştiğinde veya güncellendiğinde geçmişte hizmet almış kullanıcılara bilgilendirme yapılmaz.",
        "İş bu Sözleşme metni içerisinde;",
        "“izders.com” özel ders almak isteyenler ile özel ders vermek isteyenlerin arasında aracı olan platform,",
        "“Web Sitesi” http://izders.com internet sitesini,",
        "“Kullanıcı” veya “Ders Talep Eden” (Yönetmelik kapsamında Hizmet Alan olarak düşünülmelidir) Web sitesinden yazılı veya sözlü ders talep eden kişileri,",
        "“Üye” veya “Ders Veren” (Yönetmelik kapsamında Hizmet Sağlayıcı veya Hizmet Veren olarak düşünülmelidir) özel ders vermeye yetkin olduğunu ve herhangi bir engel teşkil eden durumunu olmadığını sözlü ya da yazılı olarak beyan etmiş olan özel ders vermek isteyen kişiyi,",
        "“Site Yönetimi” izders.com sitesinin yönetimini, kontrolünü sağlayan kişileri,",
        "“Ders Talebi” Kullanıcı tarafından, bir veya daha fazla Üye’den özel ders almak amacıyla Web Sitesindeki canlı yardım, e-posta, form yoluyla veya site yönetimini arayarak sözlü olarak paylaşılan, site yönetimi tarafından ilgili üyelere iletilen talepleri,",
        "Sitede kullanılan “Veli” ve “Velimiz” kavramları hizmet talep eden kullanıcıları temsil eder.",
        "“Sözleşme” iş bu Kullanıcı Sözleşmesini,",
        "“Yönetmelik” 26 Ağustos 2015 günlü ve 29457 sayılı Resmî Gazete’de yayınlanan Elektronik Ticarette Hizmet Sağlayıcı ve Aracı Hizmet Sağlayıcılar Hakkında Yönetmelik’i, ifade eder.",
        "Madde 3.  izders.com, sözleşme çerçevesinde Hizmet Veren (özel ders veren üye) konumunda olan kişiler ile ve Hizmet Alan (ders talep eden) kullanıcıların taleplerini üyelere yazılı, sözlü ulaştırma hizmeti sağlayan bir aracı ilan platformudur.",
        "Madde 4.   izders.com yalnızca bir platformdur, Web Sitesi’nde yer alan hizmetlerin sahibi veya sağlayıcısı değildir. Yönetmelik’in 6/4 ",
        "Maddesine göre, izders.com aracı hizmet sağlayıcıdır ve hizmet sunduğu elektronik ortamı kullanan gerçek ve tüzel kişiler tarafından sağlanan içeriği kontrol etmek, bu içerik ve içeriğe konu hizmetle ilgili hukuka aykırı bir faaliyetin ya da durumun söz konusu olup olmadığını araştırmakla yükümlü değildir.",
        "Madde 5.  izders.com sitede profil oluşturan üyelerin ya da özel ders vermeye uygun olduğunu beyan eden kişilerin MEB tarafından tanımlanan “Öğretmen” tanımı gereğince profillerinin bu tanıma uygunluğunu kontrol etmekle yükümlü değildir. Üyelerin kendi beyanları ve kabulleri ile kendilerini öğretmen olarak tanımlaması kendi sorumlulukları altındadır.",
        "Madde 6. izders.com 5580 kanun numaralı ÖZEL ÖĞRETİM KURUMLARI KANUNU kapsamında eğitim öğretim faaliyetleri yapan veya eğitim öğretim faaliyetlerine aracılık hizmeti veren bir KURUM değildir. Kanunda belirtilen KURUM tanımlamalarının hiçbirisine girmez. izders.com 26 Ağustos 2015 günlü ve 29457 sayılı Resmî Gazete’de yayınlanan Elektronik Ticarette Hizmet Sağlayıcı ve Aracı Hizmet Sağlayıcılar Hakkında Yönetmelik kapsamında bir hizmet sağlayıcı bir platformdur.",
        "Madde 7. izders.com ders talep eden kullanıcılardan hiçbir ücret talep etmez.Gelir Dairesi Başkanlığı 30/07/2013 tarih ve 84098128-120.04-450 sayılı “Öğrencilere özel ders verilmesi karşılığında alınan ücretin serbest meslek kazancı olarak değerlendirileceği hk.” Özelge kapsamında, Üyeler yasal olarak serbest meslek mensubu sayılır ve serbest meslek makbuzu düzenleyip kazanç defteri tutmakla mükelleftir. izders.com üyelerinin verdikleri hizmetlerden dolayı elde ettikleri gelirlerden doğacak kazançlarının vergi beyanlarını takip etmez ve sorumluluk kabul etmez.",
        "Madde 8.   Web Sitesi’nden ders talep etmek ücretsizdir. Sözleşme koşulları uyarınca yasal sorumluluğunu kabul edenler talep edilen bilgileri doğru ve eksiksiz olarak sözel olarak beyan ederek ya da yazılı olarak doldurarak bir Ders Talebi oluşturabilir. Kullanıcılar iletişim bilgilerini paylaşarak ve detaylarını belirterek aynı anda birden fazla Ders Talebi gönderebilirler. Kullanıcıların paylaştıkları bilgilerin doğruluğunun kontrolü izders.com sorumluluğunda değildir. Cep telefonu ve İsim belirtilerek sahte ders taleplerinin üyeler tarafından dikkatle değerlendirilmeli, başka kişiler tarafından kötü niyetle oluşturulan ders taleplerinde dolayı sorumluluk ip adresi belli olan ders talep edene aittir. izders.com, bu sebeple ödemek zorunda kalacağı her türlü adli/idari para cezası ve/veya tazminat için Kullanıcı’ya aynen rücu hakkına sahiptir.",
        "Madde 9.   izders.com, Ders Talebini ders vermek isteyen üyeye ileten aracıdır ancak Ders Talebi’nin içeriğine ilişkin tüm sorumluluk Ders Talep Eden’e aittir.",
        "Madde 10.  Ders talep eden, anlaştığı üye ile kendi anlaştığı şartlar altında çalışır. Hizmet alımı esnasında doğabilecek güvenlik veya üyenin fiili hareketlerinden site yönetimi sorumlu değildir. Ders talep eden kendi güvenliğini kendisi sağlamakla yükümlüdür. Platform üyelerin fiili davranışlarıyla ilgili herhangi bir sorumluluğa sahip olmadığı gibi bu konu hakkında herhangi bir taahhütte de bulunmamaktadır.",
        "Madde 11.  Üyeler, en az 18 yaşında olduğunu teyit eder. 18 yaşının altındaki bir kullanıcı anne, baba veya velisi gözetiminde siteye üye olabilir.",
        "Madde 12.   Hizmet Veren Üyeler hizmet sonucunda vermesi gereken evrak, fatura, fiş dahil ancak bunlarla sınırlı olmaksızın kanuni mevzuat dahilinde sair tüm evrakı da hizmetin ifası ile birlikte Hizmet Alan’a (kullanıcıya) iletmek Hizmet Veren’in sorumluluğundadır. izders.com’un söz konusu belgelerin teminine ilişkin olarak herhangi bir sorumluluğu bulunmamaktadır.",
        "Madde 13.   Hizmet Alanlar, hizmet veren üye ile aralarında anlaştıkları ücreti izders.com kontrolü dışında Hizmet Veren’e doğrudan ödeyebilir. Site olarak hizmet verenin hizmet alanlardan ödeme alması için oluşturulan bir ödemesi sistemi yoktur.",
        "Madde 14.   Hizmet alanların hizmet veren üyelere yapmış oldukları ödemeler izders.com aracılığı ile gerçekleşmez, ilgili mevzuat gereği düzenleme yükümlülükleri bulunuyorsa ilgili Hizmet Veren tarafından düzenlenir. Söz konusu hizmete ilişkin fatura/fiş veya diğer belgeler izders.com’dan talep edilemez.",
        "Madde 15.   İşbu kullanıcı sözleşmesinde tanımlanan sistemin işleyişini sağlamak amacıyla izders.com Hizmet Alan ve Hizmet Veren arasındaki ödeme işlemlerinin gerçekleşmesine aracılık hizmeti sağlamaz. izders.com sadece hizmet alanlardan ilk ders ücretini hizmet verene değil izders.com’a ödenmesini talep eder. Bu sistem ile alakalı olarak Ders Veren’e ve Hizmet Alan’a gerekli bilgiler aktarılmış olup onay verdiği kabul edilir. Sonrasında doğacak hizmet veren ve hizmet alan arasındaki ödeme ile ilgili problemlerde site yönetimi sorumluluk kabul etmez.",
        "Madde 16.   izders.com’un Hizmet Alan ile Hizmet Veren arasındaki sözlü anlaşma için site yönetimi olarak garanti etmez ve edemez. Hizmet Alanlar Hizmet Veren hakkında gerekli araştırmayı kendileri yapmalıdırlar. Web Sitesi aracılığı ile Hizmet Verenler’den alınacak hizmetlere ilişkin her türlü sorumluluk Hizmet Verenlere aittir. izders.com’un hiçbir sorumluluğu bulunmaz.",
        "Madde 17.   izders.com, Hizmet Veren'i tasdik veya tavsiye etmez, çalışma performansını ya da verilen hizmetlerin sonucu veya kalitesini garanti etmez.",
        "Madde 18.   izders.com, Hizmet Veren ve Hizmet Alan arasındaki ilişkiden sorumlu olmayıp, Hizmet Veren’in sağlayacağı hizmet sırasında veya herhangi bir zamanda Hizmet Alan veya 3. kişilere vereceği zararlardan izders.com’un hiçbir sorumluluğu bulunmamaktadır.",
        "Madde 19.  izders.com Hizmet Alan’a ulusal, yerel veya diğer resmi dairelerden ya da üçüncü şahıslardan ve kanallardan gelen bilginin doğru, hatasız veya güncel olduğunu ya da Hizmet Alan’ın söz konusu bilgiyi kontrol ettiği tarihte güncel ve aktüel olduğunu beyan veya taahhüt etmemektedir.",
        "Madde 20.  izders.com, sisteminde kayıtlı Hizmet Alanların isim, adres ve telefon numarası gibi kişisel verilerinin ilgili hizmetin verilmesine yönelik olarak Hizmet Verenler ile paylaşılmasından dolayı Hizmet Alan ve Hizmet Veren(ler) arasında ortaya çıkabilecek sorunlardan veya oluşabilecek zarardan kesinlikle sorumlu değildir. Hizmet Alan ve Hizmet Veren, işbu sözleşme kapsamındaki hizmetlerin pazarlanması ve yerine getirilmesi için kişisel verilerinin işlenmesine ve işbu sözleşmedeki amaçlara uygun olarak paylaşılmasına muvafakat etmişlerdir.",
        "Madde 21.  Hizmet Alan ( ders talep eden) bilgileri izders.com tarafından ilgili Hizmet Veren ile hizmetin sağlanması adına paylaşılmaktadır. Talebin paylaşılması özel ders hizmetinin gerçekleşmesi anlamına gelmez. Hizmet alan eğer aksini belirtmemişse ilgili talebini farklı hizmet sağlayıcılar ile paylaşılmasına izin vermiş olur. Hizmet veren üyelerin eğitim, telefon, iş, adres vb bilgileri gerekli olması halinde Hizmet Alan ile hizmet sağlanması adına paylaşılmaktadır.. Söz konusu bilgilerin Hizmet Veren tarafından ayrıca Hizmet Alan’ın onayı alınmadığı hallerde reklam, pazarlama, kişisel vb. herhangi bir durum veya amaç için kullanılması, üçüncü kişilerle paylaşılması veya devri veya Hizmet Alan ile Hizmet Veren(ler) arasında ortaya çıkabilecek sorunlardan veya oluşabilecek zarardan kesinlikle sorumlu değildir.",
        "Madde 22.   Hizmet Alan’ın işbu Sözleşme koşullarına uymaması nedeniyle doğabilecek her türlü idari, hukuki ve cezai sorumluluk bizzat Hizmet Alan’a aittir.",
        "Madde 23.   Hizmet Alan, birden fazla üyeden ders talep edebilir. Bu talepler üyelere iletildikten sonra ilgili ve istekli olan üye görüşmek için sözlü ya da yazılı olarak onay verir. Ardından üyenin iletişim bilgileri ders talep eden hizmet alan ile paylaşılır. Üyelerin kendilerine gelen taleplere dönüş yapma ya da kabul etme zorunlulukları yoktur.",
        "Madde 24. izders.com Hizmet Alan ile Hizmet Veren arasında sadece ilk iletişimi sağlamakta olan bir aracıdır. Devamında Hizmet Alan ile Hizmet Veren’in aralarında paylaştıkları bilgilerin doğruluğundan ya da görüşmek için anlaşıp, anlaşamamalarından ya da doğacak herhangi bir maddi/manevi zarardan ve durumlardan sorumlu değildir. ",
        "Madde 25. izders.com, Web Sitesi'nin kullanılması ile oluşacak tüm verilerin fikri haklarına sahiptir. izders.com, söz konusu bilgilerle Kullanıcı bilgilerini açıklamaksızın demografik bilgiler içeren raporlar düzenleyebilir veya bu tarz bilgileri veya raporları kendisi kullanabilir veya bu rapor ve/veya istatistikleri iş ortakları ile üçüncü kişilerle bedelli veya bedelsiz paylaşabilir. Bu işlemler izders.com’un gizlilik politikası hükümlerine aykırılık teşkil etmez.",
        "Madde 26. izders.com Kullanıcılarına promosyonlar ile yeni hizmet veya projeler veya haberleri e-posta veya push bildirim yolu ile haberdar edebilir. Kullanıcıların söz konusu e-postaları almak istememesi halinde [info@izders.com] adresine yazılı bildirimde bulunarak veya kendisine ulaşan ticari iletişim kanalı üzerinden söz konusu bildirimleri almayı durdurabilir.",
        "Madde 27. Kullanıcılar arasında fikri hakların ihlaline ilişkin herhangi ihtilaf olduğu takdirde izders.com, kendisine ibraz edilecek kesinleşmiş ve icra edilebilir bir mahkeme kararına istinaden işlem yapmakla yükümlüdür. Diğer hallerde, izders.com kendi takdirinde olmak üzere işlem yapar.",
        "Madde 28.  Web Sitesi’nin bütünlüğünü korumak amacıyla, izders.com dilediği zaman kendi inisiyatifine dayanarak, bazı Kullanıcı’ların ve belirli İnternet Protokolü adreslerindeki Kullanıcıların Web Sitesi’ne erişmelerini engelleyebilir.",
        "Madde 29. Hizmet Veren ve Hizmet Alan, Web Sitesi’ne yüklemiş oldukları ve sözlü olarak beyan ettikleri bilgilerden ve içeriklerden 5651 sayılı Yasa’nın 4. ",
        "Maddesine göre hukuki ve cezai olarak sorumludur. İçeriklerin, izders.com tarafından yayınlanmış olması Hizmet Veren ve Hizmet Alan’ın sorumluluğunu kaldırmamaktadır.",
        "Madde 30.  izders.com hizmetlerin bazılarını veya tamamını ileride ücretli veya ücretsiz yapma hakkını saklı tutar. Bazı hizmetlerin ücretlendirme ve komisyon politikası satın alınan veya sunulan hizmetlerin sayısı, yoğunluğu veya niceliğine göre zaman zaman değişiklik gösterebilir.",
        "Madde 31.  izders.com, dilerse Kullanıcıların e-posta adresini, cep telefon numarasını ve diğer bilgileri doğrulamak amacıyla SMS, e-posta veya diğer teknik araçlar kullanabilir.",
        "Madde 32.  Kullanıcılar ve üyeler, birbirleri arasındaki ilişkilerden tamamen kendileri sorumludur.",
        "Madde 33. Kullanıcı’lar veya üyeler birbiriyle ya da izders.com çalışanları ile iletişim kurarken, ırkçı, herhangi bir grup veya kişiye karşı nefret söylemi, kişilik haklarına aykırı, hakaret içeren, taciz eden veya tacizi savunan, illegal faaliyetleri öven, haksız rekabet oluşturan, tehdit edici, müstehcen, lekeleyici ve iftiracı nitelikte içerikler kullanamaz. Aksi bir durum Kullanıcı’nın haklarının sona erdirilmesi ve gerektiğinde durumun resmi makamlara bildirilmesini gerektirebilir.",
        "Madde 34.  Hizmet Alan (kullanıcı, ders talep eden) veya Hizmet Veren’ler (üye, ders veren), kendileri veya bir başkası için hizmet almadığı veya sağlamadığı halde, lehte veya aleyhte yorum yazamaz, bir başkasının iş ürünleri, markası, ticari ünvanı ve hizmetleri hakkında haksız rekabet yaratacak şekilde içerik yazamaz. ",
        "Madde 35. izders.com Sitenin hatasız, kesintisiz ve güvenli olacağını ya da Sitenin ya da üzerindeki herhangi bir içerik, arama veya bağlantının kullanımının belirli sonuçlar sağlayacağını taahhüt etmez.",
        "Madde 36. izders.com, Siteden indirilen herhangi bir dosyanın virüs ya da diğer kirli ya da bozucu özellikler taşımayacağını garanti edemez.",
        "Madde 37. izders.com, yapılan güncellemeler esnasında doğabilecek veri kaybından sorumlu değildir.",
        "Madde 38. izders.com üye bilgilerini ve site özgün verilerini koruma amaçlı tedbirleri almaktadır. Ancak veri tabanı bilgilerine yapılabilecek saldırılar sonucu Kullanıcı bilgilerinin kötü amaçlı kişilerin eline geçmesi ve bunların kötü niyetli kullanılması halinde doğabilecek sonuçlardan dolayı sorumluluk kabul etmez.",
        "Madde 39. izders.com, Web Sitesi içeriğinde yer alan bütün alan adı, logo, grafik, ses, ikon, tasarım, metin, imge, html kodu, diğer kodlar, demonstratif, yazılı, elektronik, grafik veya makinede okunabilir şekilde sunulan teknik veriler, uygulanan satış sistemi, iş metodu ve iş modeli de dahil tüm materyallerin (“Materyaller”) ve bunlara ilişkin fikri ve sınai mülkiyet haklarının sahibi veya lisans sahibidir ve yasal koruma altındadır. Aksi belirtilmedikçe ticari ya da kişisel amaçlarla izinsiz veya kaynak göstermeksizin kullanılamaz.",
        "Madde 40. Web sitesinin tasarım ve yazılımı ile alakalı bütün haklar izders.com’a aittir. Bahsi geçen yazılımın kopyalanması veya kullanılması, kullanılan yazılımların ve teknolojilerin tersine mühendislik işlemlerine tâbi tutulması kesinlikle yasaktır.",
        "Madde 41. izders.com’a kullanıcılar veya üyeler tarafından yapılan yorum ve eleştirilerin telif hakları izders.com’a aittir. izders.com söz konusu yorumlar üzerinde çeşitli değişiklikler yapmak, yorumları silmek veya tamamen kaldırmak hakkını saklı tutar ve yorumların bazılarını site içerisinde ve sosyal medya hesaplarında yayımlamayabilir. izders.com, kullanım şartları, gizlilik prensipleri ve geçerli yasal düzenlemelere bağlı kalmak kaydıyla, kullanıcı hesabına bağlı olan bütün bilgiler, yorum ve eleştirileri kendi pazarlama faaliyetleri ile ilgili olarak kullanma hakkını saklı tutar.",
        "Madde 42.  izders.com sitesine kullanıcılar ve üyeler tarafında eklenen içeriklerin sorumlulukları tamamen yazarlara aittir. izders.com herhangi bir bilginin doğruluğu, bütünlüğü veya faydasını garanti etmez veya Web Sitesi üzerinde gösterilen, herhangi bir şahısça verilmiş fikir, tavsiye veya açıklamanın doğruluğu veya güvenilirliğini kabul, tasdik etmez veya sorumluluk kabul etmez.",
        "Madde 43.  izders.com sitesinde başka internet sitelerine link verilebilir. Bu bağlantı yapılan sitelerin içeriğinden izders.com sorumlu değildir.",
        "Madde 44. izders.com, üyeler veya kullanıcılar tarafından siteye eklenen yasadışı veya yasak olacak türden içeriği sormadan ve izin almadan kaldırma ve söz konusu içeriklerin isteye girişini yapanların üyeliğini sonlandırma hakkını saklı tutar.",
        "Madde 45.  izders.com, kullanıcı ve üyelerinin verdiği bilgilerin doğru olup olmadığını kontrol ve teyit etmemektedir. Bu yüzden üyelerinin bilgilerinin doğru olup olmamasından hiçbir şekilde sorumlu değildir ve sorumlu tutulamaz. izders.com Hizmet Veren’in veya Hizmet Alan’ın sözlü ya da yazılı olarak beyan ettiği bilgilerin gerçek olup olmamasından sorumlu değildir ve sorumlu tutulamaz. izders.com, sözlü ya da yazılı olarak beyan edilen bilgilerin gerçek olmamasından kaynaklanabilecek veya ortaya çıkabilecek iddia, talep, zarar, maddi veya manevi kayıp, hasar ve zarardan hiçbir şekilde sorumlu değildir ve sorumlu tutulamaz.",
        "Madde 46.  izders.com, Hizmet Alan ve Hizmet Veren arasındaki iletişime ve iletişimin içeriğine karışmamaktadır, sadece iletişim kurabilmeleri adına aracı olmaktadır. Ders verenler ile Ders almak isteyen Veliler arasında iletişim sırasında veya sonrasında (site aracılığı ile veya site haricinde kurulan direkt iletişim) herhangi bir anlaşmazlık olduğu taktirde, izders.com, ortaya çıkabilecek iddia, talep, zarar, maddi veya manevi kayıp, hasar ve zarardan hiçbir şekilde sorumlu değildir ve sorumlu tutulamaz.",
        "Madde 47. İşbu Sözleşme Türkiye Cumhuriyeti kanunlarına tabidir. Taraflar, işbu Sözleşme’nin tatbik ve tefsirinden doğacak her türlü uyuşmazlıkları önce kendi aralarında sulhen halletmeye gayret ederler. Sulhen halledilemeyen uyuşmazlıkların çözümü için İstanbul (Cağlayan) Mahkeme ve İcra Müdürlükleri’nin münhasıran yetkili olduğunu kabul ve beyan ederler.",
        "Madde 48.  izders.com sisteminde kayıtlı her türlü bilgi teknik bir sorun olmadığı müddetçe en az bir (1) yıl boyunca saklanır. Üyeler ve kullanıcılar arasındaki uyuşmazlık yasal mercilere iletilmesi durumunda izders.com yetkili mercilerin taleplerini yerine getirmekle yükümlüdür. Bu bilgiler istenmesi durumunda paylaşılır ve taraflar da sözleşme gereği bunu kabul etmiş olurlar.",
        "Madde 49. Bu Sözleşme Web Sitesi kullanılmaya devam edildiği, Kullanıcılara ve Üyelere izders.com tarafından yeni bir sözleşme sunulmadığı sürece yürürlükte kalacaktır. Sözleşmeyi kabul etmeyen üyeler ve kullanıcılar sitedeki verilerini info@izders.com adresine e-posta atarak silebilirler. Sitede verileri bulunmayan üyelerin site ile arasındaki bağlayıcılığı sonlanmış olur. Eski anlaştığı kullanıcılar için sözleşme şartları aynen geçerlidir. Kullanıcılar siteyi kullanarak sözleşme ile bir veya birkaç seferliğine muhatap olmuş sayılırlar. Farklı bir talepte bulunmayarak sözleşme ile ilgili şartlardan muaf olurlar. Kullanıcıların geçmiş talepleri sözleşme kapsamındadır, sonradan feshedilemez."
      ]
    };
  }
};
</script>
<style lang="sass" scoped>
#app
  font-family: 'Lemon/Milk light Regular'
  font-style: normal
  font-weight: normal
  src: local('Lemon/Milk light Regular'), url('assets/LemonMilklight.woff') format('woff')
  src: url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap')
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
.top
  position: fixed
  top: 0
  width: 100vw

.bottom
  position: fixed
  width: 100vw
  bottom: 0

body
  filter: blur(12px)
  font-family: 'Lemon/Milk light Regular'
  letter-spacing: 1px
  font-size: 12pt
  margin: 0px
  // background-color: antiquewhite
  background-color: white
  -webkit-appearance: none
.lspWrapper
  width: 100vw
  height: 100vh
  position: absolute
  z-index: 1

.lockServicePop
  position: fixed
  background-color: rgb(199, 199, 204)
  border-radius: 1em
  display: inline-block
  height: 80vh
  width: 60vw
  z-index: 2
  margin-left: 20vw
  margin-top: 2vh

img
  width: 100%

.mainImage
  width: 100vw
  background: rgb(240, 240, 240,0.2)
  height: 100vh
  position: absolute
  z-index: 20

.terms
    width: 90%
    max-width: 1350px
    margin: auto
    padding-bottom: 50px
    padding-top: 150px
    p 
        margin-top: 14px
.other
  padding-bottom: 50px
  padding-top: 150px
  @media screen and (max-width: 1200px)
    padding-top: 50px
    padding-bottom: 50px
</style>
