// Officials directory. Names & order per Officer_Directory_Marathi_v2.xlsx (2026-07-03);
// police station duty list per Pune_Police_Officers_Palkhi_Duty_List.xlsx (44 stations, 87 officers, source order).
// Blank v2 phones filled from prior verified directory where the person matches; still-unknown numbers omitted.
window.WARI_OFFICIALS = {
  admin: [
    {n:"सौ. शीतल तेली-उगले (भा.प्र.से.)", en_n:"Mrs. Sheetal Teli-Ugale (I.A.S.)", d:"विभागीय आयुक्त, पुणे विभाग", en_d:"Divisional Commissioner, Pune Division", p:"9822876089", g:"div"},
    {n:"नवल किशोर राम (भा.प्र.से.)", en_n:"Nawal Kishore Ram (I.A.S.)", d:"आयुक्त, पुणे महानगरपालिका", en_d:"Commissioner, Pune Municipal Corporation", p:"", g:"mnp"},
    {n:"विजय सूर्यवंशी (भा.प्र.से.)", en_n:"Vijay Suryawanshi (I.A.S.)", d:"आयुक्त, पिंपरी-चिंचवड महानगरपालिका", en_d:"Commissioner, Pimpri-Chinchwad Municipal Corporation", p:"", g:"mnp"},
    {n:"जितेंद्र डुडी (भा.प्र.से.)", en_n:"Jitendra Dudi (I.A.S.)", d:"जिल्हाधिकारी, पुणे", en_d:"District Collector, Pune", p:"9783802020", g:"pune"},
    {n:"गजानन पाटील (भा.प्र.से.)", en_n:"Gajanan Patil (I.A.S.)", d:"मुख्य कार्यकारी अधिकारी (सीईओ), जि.प. पुणे", en_d:"CEO, ZP Pune", p:"9850736439", g:"pune"},
    {n:"चंद्रकांत वाघमारे", en_n:"Chandrakant Waghmare", d:"अतिरिक्त मुख्य कार्यकारी अधिकारी, जि.प. पुणे", en_d:"Additional CEO, ZP Pune", p:"9922120000", g:"pune"},
    {n:"बाळासाहेब दराडे", en_n:"Balasaheb Darade", d:"उप मुख्य कार्यकारी अधिकारी (पाणी पुरवठा व स्वच्छता), जि.प. पुणे", en_d:"Deputy CEO (Water & Sanitation), ZP Pune", p:"9766544676", g:"pune"},
    {n:"संतोष पाटील (भा.प्र.से.)", en_n:"Santosh Patil (I.A.S.)", d:"जिल्हाधिकारी, सातारा", en_d:"District Collector, Satara", p:"7720073456", g:"satara"},
    {n:"श्रीमती याशनी नागराजन (भा.प्र.से.)", en_n:"Mrs. Yashni Nagarajan (I.A.S.)", d:"मुख्य कार्यकारी अधिकारी (सीईओ), जि.प. सातारा", en_d:"CEO, ZP Satara", p:"9958493779", g:"satara"},
    {n:"कार्तिकेयन एस. (भा.प्र.से.)", en_n:"Karthikeyan S. (I.A.S.)", d:"जिल्हाधिकारी, सोलापूर", en_d:"District Collector, Solapur", p:"8610480624", g:"solapur"},
    {n:"कुशल जैन (भा.प्र.से.)", en_n:"Kushal Jain (I.A.S.)", d:"मुख्य कार्यकारी अधिकारी (सीईओ), जि.प. सोलापूर", en_d:"CEO, ZP Solapur", p:"9741627497", g:"solapur"}
  ],
  policeAdmin: [
    {n:"अमितेश कुमार (भा.पो.से.)", en_n:"Amitesh Kumar (I.P.S.)", d:"पोलीस आयुक्त, पुणे शहर", en_d:"Commissioner of Police, Pune City", p:"9823133300"},
    {n:"संदीप गील (भा.पो.से.)", en_n:"Sandip Gill (I.P.S.)", d:"पोलीस अधीक्षक (ग्रामीण), पुणे ग्रामीण", en_d:"Superintendent of Police (Rural), Pune Rural", p:"8289005133"}
  ],
  policeStations: [
    {st:"समर्थ", en_st:"Samarth", addr:"Near Apollo Talkies, Rasta Peth, Pune - 411011", off:[{n:"श्री. जयंत राजुरकर", en_n:"Mr. Jayant Rajurkar",p:"7977471854"},{n:"श्री. चेतन मोरे", en_n:"Mr. Chetan More",p:"9870327700"}]},
    {st:"फरासखाना", en_st:"Faraskhana", addr:"Budhwar Peth, near Dagadusheth Temple, Pune - 411002", off:[{n:"श्री. संदिप देशमाने", en_n:"Mr. Sandip Deshmane",p:"8108734040"},{n:"श्री. शिवप्रकाश मुळे", en_n:"Mr. Shivprakash Mule",p:"9923178909"}]},
    {st:"खडक", en_st:"Khadak", addr:"Shukrawar Peth, Shivaji Road, Pune - 411002", off:[{n:"श्री. शशिकांत चव्हाण", en_n:"Mr. Shashikant Chavan",p:"9892923330"},{n:"श्रीमती शर्मिला सुतार", en_n:"Mrs. Sharmila Sutar",p:"9923436060"}]},
    {st:"डेक्कन", en_st:"Deccan", addr:"Pulachi Wadi, Deccan Gymkhana, Pune - 411004", off:[{n:"श्रीमती रुणाल मुल्ला", en_n:"Mrs. Runal Mulla",p:"9923418386"},{n:"श्रीमती सपना शिवणकर", en_n:"Mrs. Sapna Shivankar",p:"8600009471"}]},
    {st:"शिवाजीनगर", en_st:"Shivajinagar", addr:"Gaothan, Shivajinagar, Pune - 411005", off:[{n:"श्री. गिरीषकुमार दिघावकर", en_n:"Mr. Girishkumar Dighavkar",p:"9870316789"},{n:"श्री. अमर काळंगे", en_n:"Mr. Amar Kalange",p:"8108880098"}]},
    {st:"विश्रामबाग", en_st:"Vishrambag", addr:"Perugate, Sadashiv Peth, Pune - 411030", off:[{n:"श्री. प्रदीप कसबे", en_n:"Mr. Pradeep Kasbe",p:"7020715230"}]},
    {st:"सहकारनगर", en_st:"Sahakarnagar", addr:"Dhankawadi, Sahakar Nagar, Pune - 411009", off:[{n:"श्री. विठ्ठल पवार", en_n:"Mr. Vitthal Pawar",p:"9850719619"},{n:"श्री. संतोष जाधव", en_n:"Mr. Santosh Jadhav",p:"9594945354"}]},
    {st:"स्वारगेट", en_st:"Swargate", addr:"Jedhe Square, Swargate, Pune - 411042", off:[{n:"श्री. यशवंत निकम", en_n:"Mr. Yashwant Nikam",p:"9822092225"},{n:"श्री. विकास भारमळ", en_n:"Mr. Vikas Bharmal",p:"9594322794"},{n:"श्री. प्रदीप सिसोदे", en_n:"Mr. Pradeep Sisode",p:"9764204400"}]},
    {st:"दत्तवाडी / पर्वती", en_st:"Dattawadi / Parvati", addr:"Janata Vasahat, Dattawadi, Pune - 411030", off:[{n:"श्री. राजेंद्र सहाणे", en_n:"Mr. Rajendra Sahane",p:"9011861148 / 7020703813"}]},
    {st:"भारती विद्यापीठ", en_st:"Bharti Vidyapeeth", addr:"Katraj-Dehu Road Bypass, Katraj, Pune - 411046", off:[{n:"श्री. मानसिंग पाटील", en_n:"Mr. Mansing Patil",p:"9922008768"},{n:"श्री. कैलास कोडग", en_n:"Mr. Kailas Kodag",p:"9922444949"},{n:"श्रीमती अनिता निकुंभ", en_n:"Mrs. Anita Nikumbh",p:"8530107114"}]},
    {st:"बिबवेवाडी", en_st:"Bibwewadi", addr:"Mahesh Society, Bibwewadi, Pune - 411037", off:[{n:"श्रीमती आश्विनी सातपूते", en_n:"Mrs. Ashwini Satpute",p:"9922998232"},{n:"श्री. सुरज बेंद्रे", en_n:"Mr. Suraj Bendre",p:"7020847616"}]},
    {st:"मार्केटयार्ड", en_st:"Marketyard", addr:"Gultekdi, Market Yard, Pune - 411037", off:[{n:"श्री. विश्वजित जगताप", en_n:"Mr. Vishwajeet Jagtap",p:"9881715710"},{n:"श्रीमती सुनिता नवले", en_n:"Mrs. Sunita Navle",p:"8888813301"}]},
    {st:"आंबेगाव", en_st:"Ambegaon", addr:"Ambegaon Budruk, Pune - 411046", off:[{n:"श्री. शरद झिने", en_n:"Mr. Sharad Zhine",p:"8369504114"},{n:"श्री. चांगदेव सजगणे", en_n:"Mr. Changdev Sajagane",p:"9011115666"}]},
    {st:"कोथरुड", en_st:"Kothrud", addr:"Ideal Colony, Kothrud, Pune - 411038", off:[{n:"श्री. अरुण घोडके", en_n:"Mr. Arun Ghodke",p:"9130012005"},{n:"श्री. अनिल माने", en_n:"Mr. Anil Mane",p:"9552552387"}]},
    {st:"वारजे माळवाडी", en_st:"Warje Malwadi", addr:"Popular Nagar, Warje, Pune - 411058", off:[{n:"श्री. महेश बोळकोटगी", en_n:"Mr. Mahesh Bolkotgi",p:"9923075604"},{n:"श्री. प्रकाश धांडे", en_n:"Mr. Prakash Dhande",p:"8888821877"}]},
    {st:"अलंकार", en_st:"Alankar", addr:"Karve Nagar, Pune - 411052", off:[{n:"श्री. उल्हास कदम", en_n:"Mr. Ulhas Kadam",p:"—"}]},
    {st:"सिंहगड रोड", en_st:"Sinhagad Road", addr:"Manik Baug, Sinhagad Road, Pune - 411051", off:[{n:"श्री. विनय पाटणकर", en_n:"Mr. Vinay Patankar",p:"8691999689"},{n:"श्री. समीर गायकवाड", en_n:"Mr. Sameer Gaikwad",p:"9823254569"}]},
    {st:"उत्तमनगर", en_st:"Uttam Nagar", addr:"NDA Road, Uttam Nagar, Pune - 411023", off:[{n:"श्री. राघवेंद्र क्षीरसागर", en_n:"Mr. Raghavendra Kshirsagar",p:"9309129086"},{n:"श्री. दिगंबर शिंपी", en_n:"Mr. Digambar Shimpi",p:"9823227950"}]},
    {st:"नांंदेडसिटी", en_st:"Nanded City", addr:"Sinhagad Road, Nanded City, Pune - 411041", off:[{n:"श्री. अतुल भोस", en_n:"Mr. Atul Bhos",p:"9923597077"},{n:"श्री. प्रसाद राऊत", en_n:"Mr. Prasad Raut",p:"9765211100"}]},
    {st:"न-हे", addr:"Narhe Gaon, Pune - 411041", off:[{n:"श्री. संजय करनूर", en_n:"Mr. Sanjay Karnur",p:"7020229779"},{n:"श्री. ईश्वर चव्हाण", en_n:"Mr. Ishwar Chavan",p:"8805424700"}]},
    {st:"खडकी", en_st:"Khadki", addr:"Elphinstone Road, Khadki, Pune - 411003", off:[{n:"श्री. विक्रमसिंग कदम", en_n:"Mr. Vikramsingh Kadam",p:"8097047888"},{n:"श्री. किरण गायकवाड", en_n:"Mr. Kiran Gaikwad",p:"8108161501"}]},
    {st:"चतुःश्रृंगी", en_st:"Chaturshringi", addr:"Senapati Bapat Road, Pune - 411016", off:[{n:"श्री. उत्तम भजनावळे", en_n:"Mr. Uttam Bhajanawale",p:"8108961515"},{n:"अतिरिक्त संपर्क",p:"8975752545"}]},
    {st:"बाणेर", en_st:"Baner", addr:"Baner Road, Baner, Pune - 411045", off:[{n:"श्री. चंद्रशेखर सावंत", en_n:"Mr. Chandrashekhar Sawant",p:"9511675961"},{n:"श्री. विजय खिलारे", en_n:"Mr. Vijay Khilare",p:"9594939445"}]},
    {st:"येरवडा", en_st:"Yerawada", addr:"Jail Road, Yerawada, Pune - 411006", off:[{n:"श्री. अंजुम बागवान", en_n:"Mr. Anjum Bagwan",p:"8329992430"},{n:"श्री. विजय ठाकर", en_n:"Mr. Vijay Thakar",p:"8355910944"}]},
    {st:"विश्रांतवाडी", en_st:"Vishrantwadi", addr:"Alandi Road, Vishrantwadi, Pune - 411015", off:[{n:"श्री. राजेंद्र पन्हाळे", en_n:"Mr. Rajendra Panhale",p:"9011987904"},{n:"श्री. संपत राऊत", en_n:"Mr. Sampat Raut",p:"9867799661"}]},
    {st:"लक्ष्मीनगर", en_st:"Laxminagar", addr:"Yerawada, Pune - 411006", off:[{n:"श्री. रविंद्र कदम", en_n:"Mr. Ravindra Kadam",p:"8652805858"},{n:"श्री. उमेश गित्ते", en_n:"Mr. Umesh Gitte",p:"9923193088"}]},
    {st:"वानवडी", en_st:"Wanowrie", addr:"Fatima Nagar, Wanowrie, Pune - 411040", off:[{n:"श्री. पंडित रेजितवाड", en_n:"Mr. Pandit Rejitwad",p:"9923819535"},{n:"श्रीमती संगिता जाधव", en_n:"Mrs. Sangita Jadhav",p:"9923589043"}]},
    {st:"कोंढवा", en_st:"Kondhwa", addr:"NIBM Road, Kondhwa, Pune - 411048", off:[{n:"श्री. संतोष खेतमाळीस", en_n:"Mr. Santosh Khetmalis",p:"8888821525"},{n:"श्री. नवनाथ जगताप", en_n:"Mr. Navnath Jagtap",p:"9923346810"}]},
    {st:"कोंढवा बुद्रुक येवलेवाडी", en_st:"Kondhwa Budruk Yewalewadi", addr:"Yewalewadi, Kondhwa Budruk, Pune - 411048", off:[{n:"श्री. मारुती पाटील", en_n:"Mr. Maruti Patil",p:"8308108182"},{n:"श्री. दिपक करांडे", en_n:"Mr. Deepak Karande",p:"8888861498"}]},
    {st:"बंडगार्डन", en_st:"Bundgarden", addr:"Bund Garden Road, Pune - 411001", off:[{n:"श्री. संतोष पांढरे", en_n:"Mr. Santosh Pandhare",p:"9923139779"},{n:"श्री. निळकंठ जगताप", en_n:"Mr. Nilkanth Jagtap",p:"8007066300"}]},
    {st:"लष्कर", addr:"Camp, Pune - 411001", off:[{n:"श्री. युवराज हांडे", en_n:"Mr. Yuvraj Hande",p:"8275200947"},{n:"श्री. गजानन चोरमले", en_n:"Mr. Gajanan Chormale",p:"9892806717"}]},
    {st:"कोरेगाव पार्क", en_st:"Koregaon Park", addr:"Lane 1, Coregaon Park, Pune - 411001", off:[{n:"श्री. विजयकुमार डोके", en_n:"Mr. Vijaykumar Doke",p:"9594927795"},{n:"श्री. शरद शेळके", en_n:"Mr. Sharad Shelke",p:"9082939525"}]},
    {st:"हडपसर", en_st:"Hadapsar", addr:"Solapur Road, Hadapsar, Pune - 411028", off:[{n:"श्री. संजय मोगले", en_n:"Mr. Sanjay Mogale",p:"8390079440"},{n:"श्री. निलेश जगदाळे", en_n:"Mr. Nilesh Jagdale",p:"9049981221"}]},
    {st:"मुंढवा", en_st:"Mundhwa", addr:"Mundhwa Road, Pune - 411036", off:[{n:"श्रीमती स्मिता वासनिक", en_n:"Mrs. Smita Wasnik",p:"8888291280"},{n:"श्री. सागर गोडे", en_n:"Mr. Sagar Gode",p:"9922431899"}]},
    {st:"काळेपडळ", en_st:"Kalepadal", addr:"Hadapsar, Pune - 411028", off:[{n:"श्रीमती गिरीषा निंबाळकर", en_n:"Mrs. Girisha Nimbalkar",p:"9823246444"},{n:"श्री. आण्णासो बाबर", en_n:"Mr. Annaso Babar",p:"7350518994"}]},
    {st:"लोणी काळभोर", en_st:"Loni Kalbhor", addr:"Pune-Solapur Highway, Loni Kalbhor - 412201", off:[{n:"श्री. प्रदिप पवार", en_n:"Mr. Pradeep Pawar",p:"8888885845"},{n:"श्रीमती स्मिता पाटील", en_n:"Mrs. Smita Patil",p:"9923797593"}]},
    {st:"फुरुसुंगी", en_st:"Fursungi", addr:"Fursungi, Pune - 412308", off:[{n:"श्री. अमोल मोरे", en_n:"Mr. Amol More",p:"9870111492"},{n:"श्री. राजेश खांडे", en_n:"Mr. Rajesh Khande",p:"9823455474"}]},
    {st:"मांजरी", en_st:"Manjari", addr:"Manjari Budruk, Pune - 412307", off:[{n:"श्री. बाबासाहेब निकम", en_n:"Mr. Babasaheb Nikam",p:"9870656600"},{n:"श्री. इरफान नदाफ", en_n:"Mr. Irfan Nadaf",p:"9309569899"}]},
    {st:"लोणीकंद", en_st:"Lonikand", addr:"Pune-Ahmadnagar Highway, Lonikand - 412216", off:[{n:"श्रीमती सुनिता रोकडे", en_n:"Mrs. Sunita Rokade",p:"9511793639"},{n:"श्रीमती स्वाती खेडकर", en_n:"Mrs. Swati Khedkar",p:"8888807699"}]},
    {st:"वाघोली", en_st:"Wagholi", addr:"Nagar Road, Wagholi, Pune - 412207", off:[{n:"श्री. नंदकुमार गायकवाड", en_n:"Mr. Nandkumar Gaikwad",p:"9870475335"},{n:"श्रीमती पल्लवी मेहेर", en_n:"Mrs. Pallavi Meher",p:"8108256699"}]},
    {st:"लोहगाव", en_st:"Lohegaon", addr:"Lohegaon Road, Pune - 411047", off:[{n:"श्रीमती मनिषा पाटील", en_n:"Mrs. Manisha Patil",p:"9765488210"},{n:"श्री. राकेश कदम", en_n:"Mr. Rakesh Kadam",p:"9689810899"}]},
    {st:"विमानतळ", en_st:"Airport Area", addr:"Lohegaon Airport Area, Pune - 411032", off:[{n:"श्री. गोविंद जाधव", en_n:"Mr. Govind Jadhav",p:"9870661100"},{n:"श्री. महेश बोलके", en_n:"Mr. Mahesh Bolke",p:"8999913058"}]},
    {st:"खराडी", en_st:"Kharadi", addr:"IT Park Road, Kharadi, Pune - 411014", off:[{n:"श्री. संजय चव्हाण", en_n:"Mr. Sanjay Chavan",p:"9422615575"},{n:"श्री. चंद्रसेन पालकर", en_n:"Mr. Chandrasen Palkar",p:"9967914641"}]},
    {st:"चंदननगर", en_st:"Chandan Nagar", addr:"Nagar Road, Chandan Nagar, Pune - 411014", off:[{n:"श्री. निलेश बडख", en_n:"Mr. Nilesh Badakh",p:"9923732999"},{n:"श्री. अमोल धस", en_n:"Mr. Amol Dhas",p:"9823391766"}]}
  ],
  health: [
    {n:"डॉ. भगवान पवार", en_n:"Dr. Bhagwan Pawar", d:"उपसंचालक आरोग्य सेवा, पुणे मंडळ", en_d:"Deputy Director Health Services, Pune Circle", p:"", g:"div"},
    {n:"डॉ. रामचंद्र हंकारे", en_n:"Dr. Ramchandra Hankare", d:"जिल्हा आरोग्य अधिकारी (DHO), जि.प. पुणे", en_d:"District Health Officer (DHO), ZP Pune", p:"9422618468", g:"pune"},
    {n:"डॉ. अंबादास देवमाने", en_n:"Dr. Ambadas Devmane", d:"जिल्हा शल्य चिकित्सक, औंध, पुणे", en_d:"District Civil Surgeon, Aundh, Pune", p:"9850961920", g:"pune"},
    {n:"डॉ. महेश खलिपे", en_n:"Dr. Mahesh Khalipe", d:"जिल्हा आरोग्य अधिकारी (DHO), सातारा जिल्हा", en_d:"District Health Officer (DHO), Satara", p:"9766378873", g:"satara"},
    {n:"डॉ. राहुल जाधव", en_n:"Dr. Rahul Jadhav", d:"प्रभारी जिल्हा शल्य चिकित्सक, सातारा जिल्हा", en_d:"In-charge District Civil Surgeon, Satara", p:"9420494177", g:"satara"},
    {n:"डॉ. वर्षा डोईफोडे", en_n:"Dr. Varsha Doifode", d:"जिल्हा आरोग्य अधिकारी / शल्य चिकित्सक, सोलापूर जिल्हा", en_d:"District Health Officer / Civil Surgeon, Solapur", p:"9130675303", g:"solapur"},
    {n:"डॉ. सतीश कोपूरवाड", en_n:"Dr. Satish Kopurwad", d:"जिल्हा आरोग्य अधिकारी (DHO), सोलापूर जिल्हा", en_d:"District Health Officer (DHO), Solapur", p:"9892703745", g:"solapur"},
    {n:"डॉ. नीना बोराडे", en_n:"Dr. Neena Borade", d:"प्रमुख आरोग्य अधिकारी, पुणे महानगरपालिका", en_d:"Chief Health Officer, Pune Municipal Corporation", p:"9730481248", g:"mnp"},
    {n:"डॉ. लक्ष्मण गोफणे", en_n:"Dr. Laxman Gofane", d:"वैद्यकीय आरोग्य अधिकारी, पिंपरी-चिंचवड महानगरपालिका", en_d:"Medical Health Officer, Pimpri-Chinchwad Municipal Corporation", p:"9922501317", g:"mnp"}
  ],
  healthState: [
    {n:"डॉ. नितीन अंबाडेकर", en_n:"Dr. Nitin Ambadekar", d:"संचालक, आरोग्य सेवा, मुंबई", en_d:"Director, Health Services, Mumbai", p:""},
    {n:"डॉ. विजय कंदेवाड", en_n:"Dr. Vijay Kandewad", d:"संचालक, आरोग्य सेवा, पुणे", en_d:"Director, Health Services, Pune", p:""},
    {n:"डॉ. सुनीता गोल्हाईत", en_n:"Dr. Sunita Golhait", d:"सहसंचालक (रुग्णालये)", en_d:"Joint Director (Hospitals)", p:""},
    {n:"डॉ. सरिता हजारे", en_n:"Dr. Sarita Hazare", d:"सहसंचालक (प्राथमिक आरोग्य)", en_d:"Joint Director (Primary Health)", p:""},
    {n:"डॉ. संदीप सांगळे", en_n:"Dr. Sandeep Sangle", d:"सहसंचालक (हिवताप, हत्तीरोग व जलजन्य आजार), पुणे", en_d:"Joint Director (Malaria, Filaria & Waterborne Diseases), Pune", p:""},
    {n:"राष्ट्रीय आरोग्य अभियान (NHM) कार्यालय", en_n:"National Health Mission (NHM) Office", d:"आरोग्य भवन, आयुक्तालय, मुंबई", en_d:"Arogya Bhavan, Commissionerate, Mumbai", p:"022-22717500"}
  ],
  healthTeam: [
    {n:"डॉ. वंदना वसावे", en_n:"Dr. Vandana Vasave", d:"अति. जिल्हा आरोग्य अधिकारी, जि.प. पुणे", en_d:"Additional DHO, ZP Pune", p:"9422780176", g:"pune"},
    {n:"डॉ. दिपक साळुंखे", en_n:"Dr. Deepak Salunkhe", d:"जिल्हा माता-बाल संगोपन अधिकारी, पुणे", en_d:"District Maternal & Child Health Officer, Pune", p:"9921640555", g:"pune"},
    {n:"श्रीमती अपर्णा पाटील", en_n:"Mrs. Aparna Patil", d:"जिल्हा हिवताप अधिकारी, पुणे", en_d:"District Malaria Officer, Pune", p:"9588623853", g:"pune"},
    {n:"डॉ. माधवी शिंदे", en_n:"Dr. Madhavi Shinde", d:"साथरोग वैद्यकीय अधिकारी, जि.प. पुणे", en_d:"Epidemic Medical Officer, ZP Pune", p:"9404614559", g:"pune"},
    {n:"डॉ. पराजी वायाळ", en_n:"Dr. Paraji Wayal", d:"फिरते पथक प्रमुख – श्री संत ज्ञानेश्वर महाराज पालखी", en_d:"Mobile Medical Team Chief - Sant Dnyaneshwar Maharaj Palkhi", p:"9370030755", g:"pune"},
    {n:"डॉ. मोहन पांढरे", en_n:"Dr. Mohan Pandhare", d:"फिरते पथक प्रमुख – जगद्गुरू श्री संत तुकाराम महाराज पालखी", en_d:"Mobile Medical Team Chief - Sant Tukaram Maharaj Palkhi", p:"8308851175", g:"pune"},
    {n:"डॉ. सुनिल चव्हाण", en_n:"Dr. Sunil Chavan", d:"अति. जिल्हा आरोग्य अधिकारी, सातारा", en_d:"Additional DHO, Satara", p:"9822923484", g:"satara"},
    {n:"डॉ. अभिराज सुर्यवंशी", en_n:"Dr. Abhiraj Suryawanshi", d:"जिल्हा माता-बाल संगोपन अधिकारी, सातारा", en_d:"District Maternal & Child Health Officer, Satara", p:"9403440000", g:"satara"},
    {n:"डॉ. अविनाश पाटील", en_n:"Dr. Avinash Patil", d:"जिल्हा हिवताप अधिकारी, सातारा", en_d:"District Malaria Officer, Satara", p:"9420760017", g:"satara"},
    {n:"डॉ. नंदकिशोर घाडगे", en_n:"Dr. Nandkishore Ghadge", d:"अति. जिल्हा आरोग्य अधिकारी, सोलापूर", en_d:"Additional DHO, Solapur", p:"9834782650", g:"solapur"},
    {n:"डॉ. हर्षल जाधव", en_n:"Dr. Harshal Jadhav", d:"जिल्हा माता-बाल संगोपन अधिकारी, सोलापूर", en_d:"District Maternal & Child Health Officer, Solapur", p:"9420129901", g:"solapur"},
    {n:"डॉ. एकनाथ बोधले", en_n:"Dr. Eknath Bodhle", d:"जिल्हा हिवताप अधिकारी, पंढरपूर", en_d:"District Malaria Officer, Pandharpur", p:"9420543098", g:"solapur"}
  ],
  taluka: [
    {t:"पुणे शहर", dist:"पुणे जिल्हा", th:{n:"जयराज देशमुख", en_n:"Jayraj Deshmukh", p:"9404395525"}},
    {t:"खेड (आळंदी)", dist:"पुणे जिल्हा", th:{n:"प्रशांत बेडसे", en_n:"Prashant Bedse", p:"7588616500"}, bdo:{n:"विशाल शिंदे", en_n:"Vishal Shinde", p:"9766866408"}, tho:{n:"डॉ. विलास माने", en_n:"Dr. Vilas Mane", p:"8329699189"}},
    {t:"हवेली", dist:"पुणे जिल्हा", th:{n:"तृप्ती कोलते", en_n:"Trupti Kolte", p:"9850719516"}, bdo:{n:"शेखर शेलार", en_n:"Shekhar Shelar", p:"9545321111"}, tho:{n:"डॉ. सुरेश गोरे", en_n:"Dr. Suresh Gore", p:"9975732073"}},
    {t:"पुरंदर (सासवड)", dist:"पुणे जिल्हा", th:{n:"विक्रम राजपूत", en_n:"Vikram Rajput", p:"9922317071"}, bdo:{n:"प्रणोती श्रीश्रीमळ", en_n:"Pranoti Shrishrimal", p:"9420666191"}, tho:{n:"डॉ. विक्रम काळे", en_n:"Dr. Vikram Kale", p:"9850491427"}},
    {t:"दौंड", dist:"पुणे जिल्हा", th:{n:"अरुण शेलार", en_n:"Arun Shelar", p:"9860943938"}, bdo:{n:"अरुण मरभळ", en_n:"Arun Marbhal", p:"9657395043"}, tho:{n:"डॉ. उज्ज्वला जाधव", en_n:"Dr. Ujjwala Jadhav", p:"8308777692"}},
    {t:"बारामती", dist:"पुणे जिल्हा", th:{n:"स्वप्नील रावडे", en_n:"Swapnil Rawade", p:"7385764330"}, bdo:{n:"किशोर माने", en_n:"Kishor Mane", p:"8600822765"}, tho:{n:"डॉ. मनोज खोमणे", en_n:"Dr. Manoj Khomane", p:"9822020595"}},
    {t:"इंदापूर", dist:"पुणे जिल्हा", th:{n:"जीवन बनसोडे", en_n:"Jeevan Bansode", p:"9764007579"}, bdo:{n:"सचिन खुडे", en_n:"Sachin Khude", p:"7721837755"}, tho:{n:"डॉ. सुरेखा पोळ", en_n:"Dr. Surekha Pol", p:"7588910789"}},
    {t:"खंडाळा (लोणंद)", dist:"सातारा जिल्हा", th:{n:"सुहास थोरात", en_n:"Suhas Thorat", p:"7499822551"}, bdo:{n:"अनिल वाघमरे", en_n:"Anil Waghmare", p:"8275037148"}, tho:{n:"डॉ. प्रद्युम्न बुलाख", en_n:"Dr. Pradyumna Bulakh", p:"9850633567"}},
    {t:"फलटण", dist:"सातारा जिल्हा", th:{n:"अभिजित जाधव", en_n:"Abhijit Jadhav", p:"8208085476"}, bdo:{n:"अक्षय घावटे", en_n:"Akshay Ghavate", p:"7821050063"}, tho:{n:"डॉ. संतोष कोंडके", en_n:"Dr. Santosh Kondke", p:"8007056401"}},
    {t:"माळशिरस", dist:"सोलापूर जिल्हा", th:{n:"सुरेश शेजुळ", en_n:"Suresh Shejul", p:"9860373301"}, bdo:{n:"रघुनाथ पांढरे", en_n:"Raghunath Pandhare", p:"8208660065"}, tho:{n:"डॉ. भाऊसाहेब जानकर", en_n:"Dr. Bhausaheb Janankar", p:""}},
    {t:"पंढरपूर", dist:"सोलापूर जिल्हा", th:{n:"अनिल लंगोटे", en_n:"Anil Langote", p:"7387433462"}, bdo:{n:"अमोल जाधव", en_n:"Amol Jadhav", p:"8983160601"}, tho:{n:"डॉ. एकनाथ बोधले", en_n:"Dr. Eknath Bodhle", p:"9420543098"}}
  ]
};
(function(){
  function t(key) {
    let lang = localStorage.getItem('wari_lang') || 'mr';
    return (window.T && window.T[lang] && window.T[lang][key]) || key;
  }
  function districtBlocks(O){
    let lang = localStorage.getItem('wari_lang') || 'mr';
    return DISTRICTS.map(function(d){
      var a=byG(O.admin,d[0]), h=byG(O.health,d[0]), team=byG(O.healthTeam,d[0]);
      var t=O.taluka.filter(function(o){return o.dist===d[1];});
      var html=dhdr(lang === 'en' ? d[2] : d[1]);
      if(a.length) html+=sub(lang === 'en' ? '🏛 Administration' : '🏛 प्रशासन · Administration')+rows(a);
      if(h.length) html+=sub(lang === 'en' ? '🩺 Health Officers' : '🩺 आरोग्य अधिकारी · Health Officers')+rows(h);
      if(team.length) html+=sub(lang === 'en' ? '🏥 District Health Team' : '🏥 जिल्हा आरोग्य पथक · District Health Team')+rows(team);
      if(t.length) html+=sub(lang === 'en' ? '👤 Taluka Officers' : '👤 तालुका अधिकारी · Taluka Officers')+talukaRows(t);
      return html;
    }).join('');
  }

  function tel(p){return (p||'').replace(/[^0-9+]/g,'');}
  function phones(p){if(!p)return '<span class="hnop">—</span>';return p.split(/\s*\/\s*/).map(function(x){return '<a href="tel:'+tel(x)+'">'+x+'</a>';}).join('');}
  function rows(list){return list.map(function(o){
    let lang = localStorage.getItem('wari_lang') || 'mr'; let name = (lang==='en'&&o.en_n)?o.en_n:o.n; let desc = (lang==='en'&&o.en_d)?o.en_d:o.d; return '<div class="hrow"><div class="hname">'+name+'<small>'+desc+'</small></div>'
      +'<div class="hnum">'+phones(o.p)+'</div></div>';}).join('');}
  function stationRows(list){return list.map(function(s){
    let lang = localStorage.getItem('wari_lang') || 'mr'; var names=s.off.map(function(o){return (lang==='en'&&o.en_n)?o.en_n:o.n;}).join(' · ');
    var nums=s.off.map(function(o){return phones(o.p);}).join('');
    let stName = (lang==='en'&&s.en_st)?s.en_st:s.st; return '<div class="hrow"><div class="hname"><b>🚔 '+stName+'</b><small>'+names+'<br>'+s.addr+'</small></div>'
      +'<div class="hnum">'+nums+'</div></div>';}).join('');}
  function talukaRows(list){var out='';
    function pill(lbl,p){return '<a href="tel:'+tel(p)+'" style="display:inline-flex;align-items:center;gap:5px;background:#159653;color:#fff;border-radius:999px;padding:6px 13px;font-size:13px;font-weight:800;text-decoration:none;white-space:nowrap">📞 '+lbl+' '+p+'</a>';}
    list.forEach(function(o){
    var parts=[];
    let lang = localStorage.getItem('wari_lang') || 'mr';
    if(o.th) parts.push((lang==='en'?'Tehsildar: ':'तहसीलदार: ')+( (lang==='en'&&o.th.en_n)?o.th.en_n:o.th.n ));
    if(o.bdo) parts.push((lang==='en'?'BDO: ':'गटविकास: ')+( (lang==='en'&&o.bdo.en_n)?o.bdo.en_n:o.bdo.n ));
    if(o.tho) parts.push((lang==='en'?'THO: ':'तालुका आरोग्य अ.: ')+( (lang==='en'&&o.tho.en_n)?o.tho.en_n:o.tho.n ));
    var nums='';
    if(o.th&&o.th.p) nums+=pill(lang==='en'?'Teh.':'तह.',o.th.p);
    if(o.bdo&&o.bdo.p) nums+=pill(lang==='en'?'BDO':'ग.वि.',o.bdo.p);
    if(o.tho&&o.tho.p) nums+=pill(lang==='en'?'THO':'आ.अ.',o.tho.p);
    // Full-width block: taluka name, officer names on ONE line, then the call buttons in a row.
    let talukaName = (lang==='en'&&o.en_t)?o.en_t:o.t; out+='<div style="padding:9px 2px;border-bottom:1px solid #f0e6d4">'
      +'<div style="font-weight:900;font-size:15px;color:#23160d;margin-bottom:2px">'+talukaName+'</div>'
      +'<div style="font-size:12px;color:#6b5238;line-height:1.5;margin-bottom:8px">'+parts.join(' · ')+'</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:7px">'+nums+'</div>'
      +'</div>';});
    return out;}
  // Small sub-header inside a district block
  function sub(t){return '<div style="font-weight:800;font-size:11.5px;color:#7c2d00;margin:9px 0 3px;padding-left:2px;opacity:.9">'+t+'</div>';}
  function dhdr(t){return '<div class="hgrp" style="background:#f27405;color:#fff;border-radius:10px;padding:7px 11px;margin:14px 0 6px;font-size:14px">📍 '+t+'</div>';}
  function byG(list,g){return list.filter(function(o){return o.g===g;});}
  // Districts, each self-contained: revenue/admin officers + health officers + taluka officers.
  var DISTRICTS=[['pune','पुणे जिल्हा','Pune District'],['satara','सातारा जिल्हा','Satara District'],['solapur','सोलापूर जिल्हा','Solapur District']];
  function districtBlocks(O){
    return DISTRICTS.map(function(d){
      var a=byG(O.admin,d[0]), h=byG(O.health,d[0]), team=byG(O.healthTeam,d[0]);
      var t=O.taluka.filter(function(o){return o.dist===d[1];});
      var html=dhdr(d[1]);
      if(a.length) html+=sub('🏛 प्रशासन · Administration')+rows(a);
      if(h.length) html+=sub('🩺 आरोग्य अधिकारी · Health Officers')+rows(h);
      if(team.length) html+=sub('🏥 जिल्हा आरोग्य पथक · District Health Team')+rows(team);
      if(t.length) html+=sub('👤 तालुका अधिकारी · Taluka Officers')+talukaRows(t);
      return html;
    }).join('');
  }
  function render(){
    let lang = localStorage.getItem('wari_lang') || 'mr';
    var O=window.WARI_OFFICIALS;
    var ab=document.getElementById('admin-body');
    var hb=document.getElementById('health-body');
    var pb=document.getElementById('police-body');
    var el=document.getElementById('officials-body');
    
    var adminHtml=districtBlocks(O)
      +'<div class="hgrp">' + (lang === 'en' ? '🏛 Divisional & Municipal' : '🏛 विभागीय व महानगरपालिका · Divisional & Municipal') + '</div>'+rows(byG(O.admin,'div').concat(byG(O.admin,'mnp')));
    
    var healthHtml='<div class="hgrp">' + (lang === 'en' ? '🩺 Divisional & Municipal Health' : '🩺 विभागीय व महानगरपालिका आरोग्य · Divisional & Municipal Health') + '</div>'+rows(byG(O.health,'div').concat(byG(O.health,'mnp')))
      +'<div class="hgrp">' + (lang === 'en' ? '🏢 State-level Senior Officers' : '🏢 राज्यस्तरीय वरिष्ठ अधिकारी · State-level') + '</div>'+rows(O.healthState);
    
    var policeHtml='<div class="hgrp">' + (lang === 'en' ? '👮 Police Administration' : '👮 पोलीस प्रशासन · Police Administration') + '</div>'+rows(O.policeAdmin)
      +'<div class="hgrp">' + (lang === 'en' ? '🚔 Police Station — Palkhi Route Duty ('+O.policeStations.length+' Stations)' : '🚔 पोलीस स्टेशन — पालखी मार्ग ड्युटी ('+O.policeStations.length+' स्टेशन) · Police on Palkhi Duty') + '</div>'+stationRows(O.policeStations);
    
    if(ab) ab.innerHTML=adminHtml;
    if(hb) hb.innerHTML=healthHtml;
    if(pb) pb.innerHTML=policeHtml;
    if(el&&!ab) el.innerHTML=adminHtml+healthHtml+(pb?'':policeHtml);
  }
  
  // Expose renderer to window so switcher can refresh the list dynamically
  window.renderOfficials = render;
  if(document.readyState!=='loading') render(); else document.addEventListener('DOMContentLoaded', render);
})();
