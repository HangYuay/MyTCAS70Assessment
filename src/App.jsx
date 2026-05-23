import { useState } from "react";

/* ─── Google Fonts: Prompt (Thai modern) ─────────────────────────────────── */
const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');`;

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const T = {
  bg:       "#F8F9FB",
  surface:  "#FFFFFF",
  card:     "#FFFFFF",
  border:   "#E8ECF0",
  borderSoft:"#F0F3F7",
  accent:   "#2563EB",
  accentLt: "#EFF6FF",
  green:    "#059669",
  greenLt:  "#ECFDF5",
  amber:    "#D97706",
  amberLt:  "#FFFBEB",
  red:      "#DC2626",
  redLt:    "#FEF2F2",
  purple:   "#7C3AED",
  purpleLt: "#F5F3FF",
  text:     "#0F172A",
  sub:      "#475569",
  muted:    "#94A3B8",
  light:    "#CBD5E1",
};

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
${FONT_LINK}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${T.bg};color:${T.text};font-family:'Prompt',sans-serif;font-size:14px;line-height:1.6;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:${T.borderSoft};}
::-webkit-scrollbar-thumb{background:${T.light};border-radius:99px;}
input,select,textarea,button{font-family:'Prompt',sans-serif;}
.fadein{animation:fadein .3s ease;}
@keyframes fadein{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.spin{animation:spin 1s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
`;

/* ─── Universities & Faculties data ──────────────────────────────────────── */
const UNIVERSITIES = [
  {
    id:"cu", name:"จุฬาลงกรณ์มหาวิทยาลัย", short:"CU", color:"#8B0000",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/5/5e/Chulalongkorn_University_Logo.png/240px-Chulalongkorn_University_Logo.png",
    website:"https://www.chula.ac.th",
    faculties:[
      { name:"แพทยศาสตร์", seats:{r1:0,r2:35,r3:0,r4:0},
        rounds:[
          {r:2,criteria:"GPAX ≥ 3.50 | TPAT1 ≥ 30 | A-Level: คณิต1 ≥ 70, ฟิสิกส์ ≥ 70, เคมี ≥ 70, ชีวะ ≥ 70, อังกฤษ ≥ 60",note:"สอบผ่าน กสพท จึงมีสิทธิ์สัมภาษณ์"},
          {r:3,criteria:"ใช้คะแนน กสพท (TPAT1) + A-Level 5 วิชา คิดสัดส่วน",note:"แข่งขันสูงมาก"},
        ]},
      { name:"วิศวกรรมศาสตร์", seats:{r1:40,r2:150,r3:200,r4:30},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio แสดงความสามารถด้านวิทย์-คณิต หรือรางวัลวิชาการ",note:"CU-ENT สามารถยื่นได้"},
          {r:2,criteria:"GPAX ≥ 3.00 | TGAT ≥ 40 | A-Level: คณิต1 ≥ 60, ฟิสิกส์ ≥ 50",note:"โควตาพื้นที่ทั่วประเทศ"},
          {r:3,criteria:"TGAT 30% + A-Level คณิต1 40% + A-Level ฟิสิกส์ 30%",note:"ไม่กำหนด GPAX ขั้นต่ำ"},
        ]},
      { name:"อักษรศาสตร์", seats:{r1:60,r2:80,r3:120,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio ทักษะภาษา/กิจกรรมด้านวรรณกรรม",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 40 | A-Level: ไทย ≥ 40, อังกฤษ ≥ 40",note:""},
          {r:3,criteria:"TGAT 40% + A-Level ไทย 30% + A-Level อังกฤษ 30%",note:""},
        ]},
      { name:"นิติศาสตร์", seats:{r1:0,r2:60,r3:150,r4:20},
        rounds:[
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 40",note:""},
          {r:3,criteria:"TGAT 50% + A-Level สังคม 30% + A-Level ไทย 20%",note:""},
        ]},
      { name:"พาณิชยศาสตร์และการบัญชี", seats:{r1:20,r2:100,r3:180,r4:30},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio แสดงความสามารถด้านธุรกิจ",note:""},
          {r:2,criteria:"GPAX ≥ 3.00 | TGAT ≥ 45 | A-Level: คณิต1 ≥ 50",note:""},
          {r:3,criteria:"TGAT 40% + A-Level คณิต1 40% + A-Level อังกฤษ 20%",note:""},
        ]},
      { name:"สถาปัตยกรรมศาสตร์", seats:{r1:15,r2:30,r3:60,r4:10},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio ผลงานสร้างสรรค์ / ทักษะศิลปะ",note:""},
          {r:2,criteria:"GPAX ≥ 3.00 | TPAT4 ≥ 30",note:""},
          {r:3,criteria:"TGAT 20% + TPAT4 50% + A-Level คณิต 30%",note:""},
        ]},
    ]
  },
  {
    id:"mu", name:"มหาวิทยาลัยมหิดล", short:"MU", color:"#003087",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/e/e7/MahidolUniversityLogo.svg/240px-MahidolUniversityLogo.svg.png",
    website:"https://www.mahidol.ac.th",
    faculties:[
      { name:"แพทยศาสตร์ (ศิริราช)", seats:{r1:0,r2:10,r3:0,r4:0},
        rounds:[
          {r:2,criteria:"GPAX ≥ 3.50 | TPAT1 ≥ 30 | A-Level: คณิต1 + ฟิสิกส์ + เคมี + ชีวะ ≥ 70 ทุกวิชา",note:"กสพท – แข่งขันสูงมาก"},
        ]},
      { name:"วิศวกรรมศาสตร์", seats:{r1:20,r2:80,r3:150,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio รางวัลวิชาการ/โครงงาน",note:""},
          {r:2,criteria:"GPAX ≥ 3.00 | TGAT ≥ 40 | A-Level: คณิต1 ≥ 50, ฟิสิกส์ ≥ 40",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 40% + A-Level ฟิสิกส์ 35%",note:""},
        ]},
      { name:"วิทยาศาสตร์", seats:{r1:30,r2:100,r3:200,r4:30},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio ผลงานวิจัย/โครงงานวิทยาศาสตร์",note:""},
          {r:2,criteria:"GPAX ≥ 3.00 | A-Level วิทย์ ≥ 40",note:""},
          {r:3,criteria:"TGAT 20% + A-Level วิทย์ 60% + A-Level คณิต 20%",note:""},
        ]},
      { name:"พยาบาลศาสตร์", seats:{r1:10,r2:40,r3:60,r4:10},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio กิจกรรมจิตอาสา/สาธารณสุข",note:""},
          {r:2,criteria:"GPAX ≥ 3.00 | TPAT1 ≥ 20 | A-Level: ชีวะ ≥ 40",note:""},
          {r:3,criteria:"TGAT 30% + TPAT1 30% + A-Level วิทย์ 40%",note:""},
        ]},
      { name:"เภสัชศาสตร์", seats:{r1:10,r2:30,r3:50,r4:0},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.25 | Portfolio ผลงาน/รางวัลวิทยาศาสตร์",note:""},
          {r:2,criteria:"GPAX ≥ 3.25 | A-Level: เคมี ≥ 50, ชีวะ ≥ 50",note:""},
          {r:3,criteria:"A-Level เคมี 35% + ชีวะ 35% + คณิต 20% + TGAT 10%",note:""},
        ]},
    ]
  },
  {
    id:"tu", name:"มหาวิทยาลัยธรรมศาสตร์", short:"TU", color:"#C8102E",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/2/2d/Thammasat_University_logo.png/240px-Thammasat_University_logo.png",
    website:"https://www.tu.ac.th",
    faculties:[
      { name:"แพทยศาสตร์", seats:{r1:0,r2:15,r3:0,r4:0},
        rounds:[
          {r:2,criteria:"GPAX ≥ 3.50 | กสพท: TPAT1 ≥ 30 | A-Level วิทย์ทุกวิชา ≥ 60",note:""},
        ]},
      { name:"นิติศาสตร์", seats:{r1:10,r2:60,r3:200,r4:30},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio กิจกรรม/รางวัลด้านสังคม",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35",note:""},
          {r:3,criteria:"TGAT 50% + A-Level ไทย 30% + A-Level สังคม 20%",note:""},
        ]},
      { name:"วิศวกรรมศาสตร์ (SIIT)", seats:{r1:50,r2:100,r3:100,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio (ภาษาอังกฤษ) | SAT/IELTS/TOEFL (บางโครงการ)",note:"หลักสูตรนานาชาติ"},
          {r:2,criteria:"GPAX ≥ 3.00 | TGAT ≥ 40 | A-Level คณิต ≥ 55",note:""},
          {r:3,criteria:"TGAT 30% + A-Level คณิต 40% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
      { name:"พาณิชยศาสตร์และการบัญชี (BBA)", seats:{r1:20,r2:80,r3:150,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 3.00 | Portfolio ด้านธุรกิจ",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 40 | A-Level คณิต ≥ 45",note:""},
          {r:3,criteria:"TGAT 35% + A-Level คณิต 40% + A-Level อังกฤษ 25%",note:""},
        ]},
      { name:"รัฐศาสตร์", seats:{r1:15,r2:60,r3:150,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio กิจกรรมสังคม/การเมือง",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35",note:""},
          {r:3,criteria:"TGAT 50% + A-Level สังคม 30% + A-Level ไทย 20%",note:""},
        ]},
    ]
  },
  {
    id:"ku", name:"มหาวิทยาลัยเกษตรศาสตร์", short:"KU", color:"#006400",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/1/12/Kasetsart_University_logo.jpg/240px-Kasetsart_University_logo.jpg",
    website:"https://www.ku.ac.th",
    faculties:[
      { name:"วิศวกรรมศาสตร์", seats:{r1:30,r2:120,r3:200,r4:30},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio รางวัลวิชาการ/โครงงาน | สอบข้อเขียน (บางโครงการ)",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35 | A-Level คณิต ≥ 50",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 45% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
      { name:"เกษตรศาสตร์", seats:{r1:40,r2:150,r3:200,r4:40},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.50 | Portfolio กิจกรรมเกษตร/สิ่งแวดล้อม",note:""},
          {r:2,criteria:"GPAX ≥ 2.50 | A-Level ชีวะ ≥ 35",note:""},
          {r:3,criteria:"TGAT 20% + A-Level ชีวะ 40% + A-Level เคมี 40%",note:""},
        ]},
      { name:"วิทยาศาสตร์", seats:{r1:20,r2:80,r3:150,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio ผลงานวิทยาศาสตร์",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | A-Level วิทย์ ≥ 40",note:""},
          {r:3,criteria:"TGAT 20% + A-Level วิทย์ 60% + A-Level คณิต 20%",note:""},
        ]},
      { name:"บริหารธุรกิจ", seats:{r1:20,r2:80,r3:150,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio ด้านธุรกิจ",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35",note:""},
          {r:3,criteria:"TGAT 40% + A-Level คณิต 35% + A-Level อังกฤษ 25%",note:""},
        ]},
    ]
  },
  {
    id:"kku", name:"มหาวิทยาลัยขอนแก่น", short:"KKU", color:"#8B4513",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/b/b6/KhonKaenUniversityLogo.svg/240px-KhonKaenUniversityLogo.svg.png",
    website:"https://www.kku.ac.th",
    faculties:[
      { name:"แพทยศาสตร์", seats:{r1:0,r2:30,r3:0,r4:0},
        rounds:[
          {r:2,criteria:"GPAX ≥ 3.50 | กสพท (TPAT1) | A-Level วิทย์ ≥ 60 ทุกวิชา",note:"มีโควตาภาคอีสาน"},
        ]},
      { name:"วิศวกรรมศาสตร์", seats:{r1:20,r2:100,r3:180,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio รางวัลวิชาการ",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | โควตาภาคอีสาน | TGAT ≥ 35 | A-Level คณิต ≥ 45",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 45% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
      { name:"พยาบาลศาสตร์", seats:{r1:10,r2:50,r3:80,r4:10},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio จิตอาสา",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | โควตาภาค | A-Level ชีวะ ≥ 35",note:""},
          {r:3,criteria:"TGAT 30% + TPAT1 30% + A-Level วิทย์ 40%",note:""},
        ]},
    ]
  },
  {
    id:"cmu", name:"มหาวิทยาลัยเชียงใหม่", short:"CMU", color:"#800080",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/1/17/Chiang_Mai_University_logo.svg/240px-Chiang_Mai_University_logo.svg.png",
    website:"https://www.cmu.ac.th",
    faculties:[
      { name:"แพทยศาสตร์", seats:{r1:0,r2:25,r3:0,r4:0},
        rounds:[
          {r:2,criteria:"GPAX ≥ 3.50 | กสพท (TPAT1) | A-Level วิทย์ ≥ 65",note:"มีโควตาภาคเหนือ"},
        ]},
      { name:"วิศวกรรมศาสตร์", seats:{r1:20,r2:100,r3:160,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio รางวัลวิชาการ/สิ่งประดิษฐ์",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | โควตาภาคเหนือ | A-Level คณิต ≥ 45",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 45% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
      { name:"วิทยาศาสตร์", seats:{r1:20,r2:80,r3:150,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio ผลงานวิทยาศาสตร์/โครงงาน",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | โควตาภาค | A-Level วิทย์ ≥ 40",note:""},
          {r:3,criteria:"TGAT 20% + A-Level วิทย์ 60% + A-Level คณิต 20%",note:""},
        ]},
    ]
  },
  {
    id:"psu", name:"มหาวิทยาลัยสงขลานครินทร์", short:"PSU", color:"#004A8F",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/3/38/Prince_of_Songkla_University_Logo.svg/240px-Prince_of_Songkla_University_Logo.svg.png",
    website:"https://www.psu.ac.th",
    faculties:[
      { name:"แพทยศาสตร์", seats:{r1:0,r2:20,r3:0,r4:0},
        rounds:[
          {r:2,criteria:"GPAX ≥ 3.50 | กสพท | โควตาภาคใต้ | A-Level วิทย์ ≥ 60",note:"มีโควตา 14 จังหวัดภาคใต้"},
        ]},
      { name:"วิศวกรรมศาสตร์", seats:{r1:15,r2:80,r3:150,r4:15},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | โควตาภาคใต้ | A-Level คณิต ≥ 45",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 45% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
    ]
  },
  {
    id:"kmitl", name:"สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง", short:"KMITL", color:"#B22222",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/0/07/KMITL_Logo.png/240px-KMITL_Logo.png",
    website:"https://www.kmitl.ac.th",
    faculties:[
      { name:"วิศวกรรมศาสตร์", seats:{r1:40,r2:150,r3:250,r4:40},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio รางวัลวิชาการ | สมัครเรียนวิศวะล่วงหน้า",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35 | A-Level คณิต ≥ 45",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 45% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
      { name:"สถาปัตยกรรมศาสตร์", seats:{r1:15,r2:40,r3:60,r4:10},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio ผลงานสร้างสรรค์",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TPAT4 ≥ 25",note:""},
          {r:3,criteria:"TPAT4 50% + TGAT 20% + A-Level คณิต 30%",note:""},
        ]},
      { name:"เทคโนโลยีสารสนเทศ", seats:{r1:20,r2:60,r3:100,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio โครงงานด้าน IT/Programming",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35 | A-Level คณิต ≥ 40",note:""},
          {r:3,criteria:"TGAT 30% + A-Level คณิต1 50% + A-Level ฟิสิกส์ 20%",note:""},
        ]},
    ]
  },
  {
    id:"kmutt", name:"มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", short:"KMUTT", color:"#FF8C00",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/4/46/KMUTT_Logo.svg/240px-KMUTT_Logo.svg.png",
    website:"https://www.kmutt.ac.th",
    faculties:[
      { name:"วิศวกรรมศาสตร์", seats:{r1:30,r2:120,r3:200,r4:30},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio รางวัลวิชาการ",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35 | A-Level คณิต ≥ 45",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 45% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
      { name:"วิทยาศาสตร์ประยุกต์", seats:{r1:20,r2:80,r3:120,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio ผลงานวิทย์",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | A-Level วิทย์ ≥ 40",note:""},
          {r:3,criteria:"TGAT 20% + A-Level วิทย์ 60% + A-Level คณิต 20%",note:""},
        ]},
    ]
  },
  {
    id:"swu", name:"มหาวิทยาลัยศรีนครินทรวิโรฒ", short:"SWU", color:"#2E8B57",
    logo:"https://upload.wikimedia.org/wikipedia/th/thumb/2/2c/Srinakharinwirot_University_logo.svg/240px-Srinakharinwirot_University_logo.svg.png",
    website:"https://www.swu.ac.th",
    faculties:[
      { name:"แพทยศาสตร์", seats:{r1:0,r2:10,r3:0,r4:0},
        rounds:[
          {r:2,criteria:"GPAX ≥ 3.50 | กสพท (TPAT1) | A-Level วิทย์ ≥ 60",note:""},
        ]},
      { name:"ศึกษาศาสตร์", seats:{r1:30,r2:100,r3:150,r4:20},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio กิจกรรม/รางวัลด้านการศึกษา",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | TGAT ≥ 35 | TPAT5 ≥ 30",note:""},
          {r:3,criteria:"TGAT 35% + TPAT5 35% + A-Level ไทย 30%",note:""},
        ]},
      { name:"วิศวกรรมศาสตร์", seats:{r1:10,r2:50,r3:100,r4:15},
        rounds:[
          {r:1,criteria:"GPAX ≥ 2.75 | Portfolio รางวัลวิชาการ",note:""},
          {r:2,criteria:"GPAX ≥ 2.75 | A-Level คณิต ≥ 45",note:""},
          {r:3,criteria:"TGAT 25% + A-Level คณิต1 45% + A-Level ฟิสิกส์ 30%",note:""},
        ]},
    ]
  },
];

const ROUND_COLORS = { 1:"#7C3AED", 2:"#2563EB", 3:"#059669", 4:"#D97706" };
const ROUND_NAMES = { 1:"Portfolio", 2:"Quota", 3:"Admission", 4:"Direct" };

/* ─── Tiny UI primitives ──────────────────────────────────────────────────── */
const Chip = ({ c="#2563EB", children }) => (
  <span style={{ background:`${c}12`, color:c, border:`1px solid ${c}25`,
    borderRadius:6, padding:"2px 9px", fontSize:11.5, fontWeight:500, display:"inline-flex", alignItems:"center", gap:4 }}>
    {children}
  </span>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:T.surface, border:`1px solid ${T.border}`,
    borderRadius:14, padding:20, boxShadow:"0 1px 3px rgba(0,0,0,.06)", ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize:11, fontWeight:600, color:T.muted, letterSpacing:"1px",
    textTransform:"uppercase", marginBottom:12 }}>{children}</div>
);

const FieldLabel = ({ children }) => (
  <div style={{ fontSize:12, color:T.sub, marginBottom:5, fontWeight:500 }}>{children}</div>
);

const Inp = ({ style={}, ...props }) => (
  <input {...props} style={{ background:T.bg, border:`1px solid ${T.border}`,
    borderRadius:8, padding:"8px 12px", color:T.text, fontSize:13.5,
    width:"100%", outline:"none", transition:"border .15s",
    onFocus:"this.style.borderColor='#2563EB'", ...style }} />
);

const Sel = ({ options, ...props }) => (
  <select {...props} style={{ background:T.bg, border:`1px solid ${T.border}`,
    borderRadius:8, padding:"8px 12px", color:T.text, fontSize:13.5,
    width:"100%", outline:"none" }}>
    {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
  </select>
);

const Bar = ({ value, max=100, color="#2563EB", height=7 }) => {
  const p = Math.min(100, Math.max(0, Math.round(value/max*100)));
  return (
    <div style={{ background:T.borderSoft, borderRadius:99, height, overflow:"hidden" }}>
      <div style={{ width:`${p}%`, background:color, borderRadius:99, height:"100%", transition:"width .7s ease" }}/>
    </div>
  );
};

/* ─── TABS definition ─────────────────────────────────────────────────────── */
const TABS = [
  { id:"profile",  label:"ข้อมูลส่วนตัว",     icon:"👤" },
  { id:"scores",   label:"คะแนนสอบ",          icon:"📊" },
  { id:"activity", label:"กิจกรรม & รางวัล",   icon:"🏆" },
  { id:"assess",   label:"ประเมิน TCAS",       icon:"🎯" },
  { id:"criteria", label:"เกณฑ์รับสมัคร",     icon:"🏫" },
  { id:"calendar", label:"ปฏิทิน TCAS70",     icon:"📅" },
];

const ACTIVITY_TYPES = [
  { id:"award_intl",    label:"รางวัลระดับนานาชาติ",   w:6, icon:"🌏" },
  { id:"award_national",label:"รางวัลระดับประเทศ",     w:5, icon:"🥇" },
  { id:"award_region",  label:"รางวัลระดับภาค",        w:3, icon:"🥈" },
  { id:"award_school",  label:"รางวัลระดับโรงเรียน",   w:1, icon:"🥉" },
  { id:"camp_olympiad", label:"ค่ายโอลิมปิกวิชาการ",   w:5, icon:"🏅" },
  { id:"camp_national", label:"ค่ายวิชาการระดับชาติ",  w:4, icon:"🎓" },
  { id:"camp_region",   label:"ค่ายวิชาการระดับภาค",   w:3, icon:"📋" },
  { id:"research",      label:"โครงงาน / วิจัย",       w:4, icon:"🔭" },
  { id:"volunteer",     label:"จิตอาสา / อาสาสมัคร",   w:2, icon:"🤝" },
  { id:"student_council",label:"สภานักเรียน / ประธาน", w:2, icon:"👥" },
  { id:"sport",         label:"กีฬาระดับสูง",          w:2, icon:"⚽" },
  { id:"art",           label:"ศิลปะ / ดนตรี / นาฏศิลป์",w:2,icon:"🎵"},
  { id:"exchange",      label:"แลกเปลี่ยน AFS/YFU",    w:3, icon:"✈️" },
];

const FACULTIES_SIMPLE = [
  {id:"med",  name:"แพทยศาสตร์",           icon:"⚕️", minGPA:3.5, color:"#DC2626"},
  {id:"eng",  name:"วิศวกรรมศาสตร์",       icon:"⚙️", minGPA:3.0, color:"#2563EB"},
  {id:"sci",  name:"วิทยาศาสตร์",          icon:"🔬", minGPA:3.0, color:"#7C3AED"},
  {id:"bus",  name:"บริหาร / เศรษฐศาสตร์", icon:"💼", minGPA:2.75,color:"#D97706"},
  {id:"edu",  name:"ครุ / ศึกษาศาสตร์",   icon:"📚", minGPA:2.75,color:"#059669"},
  {id:"law",  name:"นิติศาสตร์",           icon:"⚖️", minGPA:2.75,color:"#0891B2"},
  {id:"art",  name:"ศิลปะ / อักษรศาสตร์", icon:"🎨", minGPA:2.5, color:"#DB2777"},
  {id:"arch", name:"สถาปัตยกรรมศาสตร์",   icon:"🏛️", minGPA:3.0, color:"#65A30D"},
  {id:"nurs", name:"พยาบาลศาสตร์",         icon:"🏥", minGPA:3.0, color:"#EA580C"},
  {id:"it",   name:"IT / วิทยาการคอม",    icon:"💻", minGPA:2.75,color:"#4F46E5"},
];

/* ─── Assessment helpers ─────────────────────────────────────────────────── */
const assessR1 = (p) => {
  let s = 0; const n = [];
  const g = parseFloat(p.gpax)||0;
  if(g>=3.75){s+=25;n.push({ok:true,t:"GPAX ดีเยี่ยม (≥ 3.75)"});}
  else if(g>=3.5){s+=20;n.push({ok:true,t:"GPAX ดีมาก (≥ 3.5)"});}
  else if(g>=3.0){s+=12;n.push({ok:"warn",t:"GPAX ผ่านเกณฑ์ส่วนใหญ่ (≥ 3.0)"});}
  else {n.push({ok:false,t:"GPAX ต่ำ อาจไม่ผ่านเกณฑ์รอบ 1"});}
  const a = p.activities||[];
  const aN=a.filter(x=>x.type==="award_national").length, aI=a.filter(x=>x.type==="award_intl").length;
  const aR=a.filter(x=>x.type==="award_region").length, cO=a.filter(x=>x.type==="camp_olympiad").length;
  const cN=a.filter(x=>x.type==="camp_national").length, res=a.filter(x=>x.type==="research").length;
  if(aI>0){s+=35;n.push({ok:true,t:`รางวัลนานาชาติ ${aI} รายการ — โดดเด่นมาก`});}
  if(aN>0){s+=30;n.push({ok:true,t:`รางวัลระดับประเทศ ${aN} รายการ`});}
  if(aR>0){s+=15;n.push({ok:true,t:`รางวัลระดับภาค ${aR} รายการ`});}
  if(cO>0){s+=20;n.push({ok:true,t:`ค่ายโอลิมปิกวิชาการ ${cO} ค่าย`});}
  if(cN>0){s+=10;n.push({ok:true,t:`ค่ายวิชาการระดับชาติ ${cN} ค่าย`});}
  if(res>0){s+=8;n.push({ok:true,t:`โครงงาน/วิจัย ${res} ชิ้น`});}
  const sc = Math.min(100,s);
  return {score:sc, notes:n, chance:sc>=70?"สูง":sc>=45?"ปานกลาง":"ต่ำ"};
};

const assessR3 = (p) => {
  const e = p.examScores||{};
  const vals = ["tgat","amath","asci","athai","aeng"].map(k=>parseFloat(e[k])||0).filter(v=>v>0);
  const avg = vals.length? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
  const g = parseFloat(p.gpax)||0;
  const n = [];
  if(avg>=75)n.push({ok:true,t:"คะแนนเฉลี่ยดีเยี่ยม (≥ 75%)"});
  else if(avg>=55)n.push({ok:"warn",t:"คะแนนเฉลี่ยปานกลาง (55–75%)"});
  else if(vals.length>0)n.push({ok:false,t:"คะแนนยังต่ำ — ควรพัฒนา"});
  else n.push({ok:"info",t:"ยังไม่ได้กรอกคะแนนสอบ"});
  if(g>=3.0)n.push({ok:true,t:"GPAX ผ่านเกณฑ์ (≥ 3.0)"});
  else if(g>0)n.push({ok:"warn",t:"GPAX ต่ำกว่า 3.0 บางคณะอาจมีปัญหา"});
  const sc = Math.min(100, Math.round(avg*0.8 + g/4*20));
  return {score:sc, notes:n, chance:sc>=70?"สูง":sc>=45?"ปานกลาง":"ต่ำ"};
};

const noteColor = (ok) => ok===true?T.green:ok==="warn"?T.amber:ok===false?T.red:T.sub;
const noteIcon  = (ok) => ok===true?"✓":ok==="warn"?"△":ok===false?"✕":"ℹ";

const ChancePill = ({chance}) => {
  const cfg = chance==="สูง"?{c:T.green,bg:T.greenLt}:chance==="ปานกลาง"?{c:T.amber,bg:T.amberLt}:{c:T.red,bg:T.redLt};
  return <span style={{background:cfg.bg,color:cfg.c,border:`1px solid ${cfg.c}30`,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:600}}>โอกาส{chance}</span>;
};

/* ─── PS School Logo SVG (custom rendered) ───────────────────────────────── */
const PSLogo = ({size=40}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#1a3a6b" stroke="#c9a227" strokeWidth="4"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="#c9a227" strokeWidth="1.5"/>
    {/* Bodhi leaf / flame symbol */}
    <path d="M50 20 C40 30 30 40 35 55 C40 68 50 72 50 72 C50 72 60 68 65 55 C70 40 60 30 50 20Z" fill="#c9a227"/>
    <path d="M50 30 C44 38 40 46 43 56 C46 64 50 67 50 67 C50 67 54 64 57 56 C60 46 56 38 50 30Z" fill="#1a3a6b"/>
    {/* Thai text placeholder lines */}
    <rect x="28" y="76" width="44" height="4" rx="2" fill="#c9a227" opacity=".9"/>
    <rect x="33" y="83" width="34" height="3" rx="1.5" fill="#c9a227" opacity=".7"/>
    {/* Stars */}
    <circle cx="25" cy="50" r="2.5" fill="#c9a227"/>
    <circle cx="75" cy="50" r="2.5" fill="#c9a227"/>
    <circle cx="50" cy="14" r="2.5" fill="#c9a227"/>
  </svg>
);

/* ─── TCAS Logo ──────────────────────────────────────────────────────────── */
const TCASLogo = ({size=40}) => (
  <svg width={size*2.2} height={size*0.7} viewBox="0 0 110 36">
    <rect width="110" height="36" rx="7" fill="#1a3a6b"/>
    <text x="7" y="24" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="#FFFFFF">TCAS</text>
    <rect x="66" y="4" width="38" height="28" rx="5" fill="#E8A020"/>
    <text x="70" y="24" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="#1a3a6b">70</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN APP                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [tab, setTab]     = useState("profile");
  const [profile, setP]   = useState({
    name:"", school:"โรงเรียนโพธิสารพิทยากร", plan:"sci",
    gpax:"", gpa_thai:"", gpa_math:"", gpa_sci:"", gpa_social:"", gpa_eng:"", gpa_art:"",
    examScores:{ tgat:"", tpat1:"", tpat2:"", tpat3:"", tpat4:"", tpat5:"",
                 amath:"", asci:"", achem:"", abio:"", athai:"", asocial:"", aeng:"" },
    activities:[], wishFaculties:[], note:"",
  });
  const [newAct, setNA]   = useState({type:"award_national",name:"",level:"ประเทศ",award:"",year:"2569"});
  const [aiOn,   setAiOn] = useState(false);
  const [aiTxt,  setAiTxt]= useState("");
  const [aiErr,  setAiErr]= useState("");
  const [aiLoad, setAiLoad]=useState(false);

  // criteria tab state
  const [selUni, setSelUni]     = useState("");
  const [selFac, setSelFac]     = useState("");
  const [searchQ, setSearchQ]   = useState("");

  const sf = (k,v) => setP(p=>({...p,[k]:v}));
  const se = (k,v) => setP(p=>({...p,examScores:{...p.examScores,[k]:v}}));

  const addAct = () => {
    if(!newAct.name.trim()) return;
    setP(p=>({...p,activities:[...p.activities,{...newAct,id:Date.now()}]}));
    setNA({type:"award_national",name:"",level:"ประเทศ",award:"",year:"2569"});
  };
  const delAct = id => setP(p=>({...p,activities:p.activities.filter(a=>a.id!==id)}));
  const togFac = id => setP(p=>({...p,wishFaculties:p.wishFaculties.includes(id)?p.wishFaculties.filter(f=>f!==id):[...p.wishFaculties,id]}));

  const r1 = assessR1(profile);
  const r3 = assessR3(profile);

  const callAI = async () => {
    setAiLoad(true); setAiTxt(""); setAiErr("");
    try {
      const payload = { name:profile.name, plan:profile.plan, gpax:profile.gpax,
        examScores:profile.examScores, activities:profile.activities.map(a=>`${a.type}:${a.name}`).join(";"),
        wishFaculties:profile.wishFaculties, r1Score:r1.score, r3Score:r3.score };
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`คุณคือที่ปรึกษาการศึกษาผู้เชี่ยวชาญระบบ TCAS สำหรับนักเรียน ม.6 โรงเรียนโพธิสารพิทยากร ปีการศึกษา 2569 ที่จะสมัคร TCAS70 ตอบเป็นภาษาไทย ใช้ภาษากระชับ เข้าใจง่าย ให้กำลังใจ แบ่งเป็น 4 หัวข้อ: 1)จุดแข็ง-จุดอ่อน 2)โอกาสแต่ละรอบ 3)คณะที่เหมาะ 4)แผนเตรียมตัว ใช้ emoji ช่วย`,
          messages:[{role:"user",content:`ข้อมูล: ${JSON.stringify(payload)}\nโปรดวิเคราะห์และให้คำแนะนำ`}]
        })
      });
      const d = await res.json();
      setAiTxt((d.content||[]).map(c=>c.text||"").join("\n")||"ไม่สามารถรับข้อมูลได้");
    } catch(e){ setAiErr("เกิดข้อผิดพลาด: "+e.message); }
    setAiLoad(false);
  };

  /* ── Criteria filtering ── */
  const filteredUnis = UNIVERSITIES.filter(u => {
    if(searchQ) return (
      u.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      u.short.toLowerCase().includes(searchQ.toLowerCase()) ||
      u.faculties.some(f=>f.name.toLowerCase().includes(searchQ.toLowerCase()))
    );
    return true;
  });
  const currentUni = selUni ? UNIVERSITIES.find(u=>u.id===selUni) : null;
  const currentFac = currentUni && selFac ? currentUni.faculties.find(f=>f.name===selFac) : null;

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{minHeight:"100vh", background:T.bg}}>

        {/* ── HEADER ── */}
        <header style={{background:T.surface, borderBottom:`1px solid ${T.border}`,
          boxShadow:"0 1px 4px rgba(0,0,0,.05)", position:"sticky", top:0, zIndex:100}}>
          <div style={{maxWidth:960,margin:"0 auto",padding:"0 20px",height:66,display:"flex",alignItems:"center",gap:14}}>

            {/* PS Logo */}
            <div style={{flexShrink:0}}><PSLogo size={46}/></div>

            {/* Title */}
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:T.text,lineHeight:1.3}}>
                TCAS70: Student Advisor
              </div>
              <div style={{fontSize:11.5,color:T.muted,fontWeight:400}}>
                for Potisarnpittayakorn School
              </div>
            </div>

            {/* TCAS Logo */}
            <div style={{flexShrink:0}}><TCASLogo size={38}/></div>

            {/* Student name badge */}
            {profile.name && (
              <div style={{background:T.accentLt,color:T.accent,border:`1px solid ${T.accent}25`,
                borderRadius:8,padding:"5px 12px",fontSize:12.5,fontWeight:600,flexShrink:0}}>
                {profile.name}
              </div>
            )}
          </div>

          {/* TAB BAR */}
          <div style={{borderTop:`1px solid ${T.borderSoft}`,overflowX:"auto"}}>
            <div style={{maxWidth:960,margin:"0 auto",padding:"0 20px",display:"flex",gap:0}}>
              {TABS.map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)}
                  style={{background:"none",border:"none",padding:"11px 16px",cursor:"pointer",
                    fontFamily:"Prompt,sans-serif",fontSize:13,fontWeight:tab===t.id?600:400,
                    color:tab===t.id?T.accent:T.sub,
                    borderBottom:`2px solid ${tab===t.id?T.accent:"transparent"}`,
                    whiteSpace:"nowrap",transition:"all .15s",display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontSize:15}}>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main style={{maxWidth:960,margin:"0 auto",padding:"24px 20px"}} className="fadein" key={tab}>

          {/* ══════ TAB: PROFILE ══════ */}
          {tab==="profile" && (
            <div style={{display:"grid",gap:18}}>
              <Card>
                <SectionTitle>ข้อมูลส่วนตัว</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div><FieldLabel>ชื่อ-นามสกุล</FieldLabel>
                    <Inp placeholder="เช่น นายสมชาย ใจดี" value={profile.name} onChange={e=>sf("name",e.target.value)}/></div>
                  <div><FieldLabel>โรงเรียน</FieldLabel>
                    <Inp value={profile.school} onChange={e=>sf("school",e.target.value)}/></div>
                  <div>
                    <FieldLabel>แผนการเรียน</FieldLabel>
                    <Sel value={profile.plan} onChange={e=>sf("plan",e.target.value)} options={[
                      {v:"sci",l:"วิทย์-คณิต"},{v:"arts",l:"ศิลป์-คำนวณ"},{v:"lang",l:"ศิลป์-ภาษา"},
                      {v:"soc",l:"สังคม-มนุษย์"},{v:"voc",l:"อาชีวะ"},{v:"other",l:"อื่นๆ"}]}/>
                  </div>
                  <div>
                    <FieldLabel>GPAX (เกรดเฉลี่ยสะสม)</FieldLabel>
                    <Inp type="number" min="0" max="4" step="0.01" placeholder="0.00 – 4.00"
                      value={profile.gpax} onChange={e=>sf("gpax",e.target.value)}/>
                    {profile.gpax && (() => {
                      const g=parseFloat(profile.gpax)||0;
                      const msg=g>=3.75?"🌟 ดีเยี่ยม":g>=3.5?"✅ ดีมาก":g>=3.0?"⚠️ ปานกลาง":g>=2.75?"⚠️ ต่ำกว่าเกณฑ์บางส่วน":"❌ ต่ำ";
                      const c=g>=3.5?T.green:g>=3.0?T.amber:T.red;
                      return <div style={{marginTop:6,fontSize:12,color:c,fontWeight:500}}>{msg}</div>;
                    })()}
                  </div>
                </div>
              </Card>

              <Card>
                <SectionTitle>GPA รายกลุ่มวิชา</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                  {[["gpa_thai","ภาษาไทย"],["gpa_math","คณิตศาสตร์"],["gpa_sci","วิทยาศาสตร์"],
                    ["gpa_social","สังคมศึกษา"],["gpa_eng","ภาษาอังกฤษ"],["gpa_art","ศิลปะ"]].map(([k,l])=>(
                    <div key={k}><FieldLabel>{l}</FieldLabel>
                      <Inp type="number" min="0" max="4" step="0.01" placeholder="0–4"
                        value={profile[k]} onChange={e=>sf(k,e.target.value)}/>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <SectionTitle>คณะที่สนใจ</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:8}}>
                  {FACULTIES_SIMPLE.map(f=>{
                    const sel=profile.wishFaculties.includes(f.id);
                    return (
                      <div key={f.id} onClick={()=>togFac(f.id)} style={{cursor:"pointer",padding:"10px 14px",
                        borderRadius:10,border:`1.5px solid ${sel?f.color:T.border}`,
                        background:sel?`${f.color}09`:T.surface,transition:"all .15s",
                        display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:18}}>{f.icon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:sel?600:400,color:sel?f.color:T.text}}>{f.name}</div>
                          <div style={{fontSize:11,color:T.muted}}>GPAX ≥ {f.minGPA}</div>
                        </div>
                        {sel && <span style={{color:f.color,fontWeight:700,fontSize:16}}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}

          {/* ══════ TAB: SCORES ══════ */}
          {tab==="scores" && (
            <div style={{display:"grid",gap:18}}>
              <Card>
                <SectionTitle>TGAT / TPAT — สอบ ม.ค.–ก.พ. 2570</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {[
                    ["tgat","TGAT — ความถนัดทั่วไป","#2563EB"],
                    ["tpat1","TPAT 1 — ความถนัดแพทย์ (กสพท)","#DC2626"],
                    ["tpat2","TPAT 2 — ความถนัดศิลปะ สถาปัตย์","#DB2777"],
                    ["tpat3","TPAT 3 — ความถนัดวิทยาศาสตร์","#7C3AED"],
                    ["tpat4","TPAT 4 — ความถนัดสถาปัตย์","#65A30D"],
                    ["tpat5","TPAT 5 — ความถนัดครุศาสตร์","#059669"],
                  ].map(([k,l,c])=>(
                    <div key={k}>
                      <FieldLabel>{l}</FieldLabel>
                      <Inp type="number" min="0" max="100" step="0.1" placeholder="0–100"
                        value={profile.examScores[k]} onChange={e=>se(k,e.target.value)}/>
                      {profile.examScores[k]>0 && (
                        <div style={{marginTop:6}}>
                          <Bar value={parseFloat(profile.examScores[k])||0} max={100} color={c}/>
                          <div style={{textAlign:"right",fontSize:11,color:T.muted,marginTop:2}}>{profile.examScores[k]}/100</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <SectionTitle>A-Level — สอบ มี.ค. 2570</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {[
                    ["athai","81 — ภาษาไทย","#D97706"],
                    ["asocial","70 — สังคมศึกษา","#0891B2"],
                    ["aeng","61 — ภาษาอังกฤษ","#2563EB"],
                    ["amath","63 — คณิตศาสตร์ประยุกต์ 1","#7C3AED"],
                    ["asci","64 — ฟิสิกส์","#DC2626"],
                    ["achem","65 — เคมี","#EA580C"],
                    ["abio","66 — ชีววิทยา","#059669"],
                  ].map(([k,l,c])=>(
                    <div key={k}>
                      <FieldLabel>{l}</FieldLabel>
                      <Inp type="number" min="0" max="100" step="0.1" placeholder="0–100"
                        value={profile.examScores[k]||""} onChange={e=>se(k,e.target.value)}/>
                      {(profile.examScores[k]||0)>0 && (
                        <div style={{marginTop:6}}>
                          <Bar value={parseFloat(profile.examScores[k])||0} max={100} color={c}/>
                          <div style={{textAlign:"right",fontSize:11,color:T.muted,marginTop:2}}>{profile.examScores[k]}/100</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ══════ TAB: ACTIVITIES ══════ */}
          {tab==="activity" && (
            <div style={{display:"grid",gap:18}}>
              <Card>
                <SectionTitle>เพิ่มกิจกรรม / รางวัล / ค่าย</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div>
                    <FieldLabel>ประเภท</FieldLabel>
                    <Sel value={newAct.type} onChange={e=>setNA(a=>({...a,type:e.target.value}))}
                      options={ACTIVITY_TYPES.map(t=>({v:t.id,l:`${t.icon} ${t.label}`}))}/>
                  </div>
                  <div>
                    <FieldLabel>ปีที่ได้รับ</FieldLabel>
                    <Sel value={newAct.year} onChange={e=>setNA(a=>({...a,year:e.target.value}))}
                      options={["2566","2567","2568","2569","2570"].map(y=>({v:y,l:y}))}/>
                  </div>
                  <div style={{gridColumn:"span 2"}}>
                    <FieldLabel>ชื่อกิจกรรม / รางวัล / ค่าย</FieldLabel>
                    <Inp placeholder="เช่น ค่ายคณิตศาสตร์โอลิมปิก สอวน. รอบ 2 / รางวัลชนะเลิศโครงงานวิทยาศาสตร์ระดับประเทศ"
                      value={newAct.name} onChange={e=>setNA(a=>({...a,name:e.target.value}))}/>
                  </div>
                  <div>
                    <FieldLabel>ระดับ</FieldLabel>
                    <Sel value={newAct.level} onChange={e=>setNA(a=>({...a,level:e.target.value}))}
                      options={["โรงเรียน","จังหวัด","ภาค","ประเทศ","นานาชาติ"].map(l=>({v:l,l}))}/>
                  </div>
                  <div>
                    <FieldLabel>รางวัลที่ได้รับ (ถ้ามี)</FieldLabel>
                    <Inp placeholder="ชนะเลิศ / รองชนะเลิศ / เหรียญทอง"
                      value={newAct.award} onChange={e=>setNA(a=>({...a,award:e.target.value}))}/>
                  </div>
                </div>
                <button onClick={addAct} style={{marginTop:14,background:T.accent,border:"none",
                  borderRadius:9,padding:"10px",color:"#fff",cursor:"pointer",fontFamily:"Prompt,sans-serif",
                  fontSize:13.5,fontWeight:600,width:"100%",transition:"opacity .15s"}}
                  onMouseOver={e=>e.target.style.opacity=".88"} onMouseOut={e=>e.target.style.opacity="1"}>
                  + เพิ่มรายการ
                </button>
              </Card>

              {profile.activities.length>0 && (
                <Card>
                  <SectionTitle>รายการของฉัน ({profile.activities.length} รายการ)</SectionTitle>
                  <div style={{display:"grid",gap:8}}>
                    {profile.activities.map(a => {
                      const t=ACTIVITY_TYPES.find(x=>x.id===a.type);
                      const lc=a.level==="ประเทศ"||a.level==="นานาชาติ"?T.green:a.level==="ภาค"?T.amber:T.sub;
                      return (
                        <div key={a.id} style={{display:"flex",alignItems:"flex-start",gap:12,
                          padding:"11px 14px",background:T.bg,borderRadius:10,border:`1px solid ${T.border}`}}>
                          <span style={{fontSize:20,flexShrink:0,marginTop:1}}>{t?.icon||"🏅"}</span>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontWeight:500,fontSize:13.5,marginBottom:5}}>{a.name}</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              <Chip c={lc}>ระดับ{a.level}</Chip>
                              {a.award && <Chip c={T.amber}>{a.award}</Chip>}
                              <Chip c={T.sub}>{a.year}</Chip>
                              <Chip c={T.purple}>น้ำหนัก {t?.w||1}</Chip>
                            </div>
                          </div>
                          <button onClick={()=>delAct(a.id)} style={{background:"none",border:"none",
                            color:T.light,cursor:"pointer",fontSize:17,padding:"0 2px",lineHeight:1,flexShrink:0,
                            transition:"color .15s"}} onMouseOver={e=>e.target.style.color=T.red} onMouseOut={e=>e.target.style.color=T.light}>✕</button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>
                    {[
                      {l:"รางวัลนานาชาติ",n:profile.activities.filter(a=>a.type==="award_intl").length,c:"#7C3AED"},
                      {l:"รางวัลประเทศ",n:profile.activities.filter(a=>a.type==="award_national").length,c:T.green},
                      {l:"รางวัลภาค",n:profile.activities.filter(a=>a.type==="award_region").length,c:T.amber},
                      {l:"ค่ายโอลิมปิก",n:profile.activities.filter(a=>a.type==="camp_olympiad").length,c:"#7C3AED"},
                      {l:"จิตอาสา",n:profile.activities.filter(a=>a.type==="volunteer").length,c:T.green},
                      {l:"โครงงาน",n:profile.activities.filter(a=>a.type==="research").length,c:"#DB2777"},
                    ].map(s=>(
                      <div key={s.l} style={{textAlign:"center",padding:"10px 8px",background:T.surface,
                        borderRadius:10,border:`1px solid ${s.n>0?s.c+"30":T.border}`}}>
                        <div style={{fontSize:22,fontWeight:700,color:s.n>0?s.c:T.light}}>{s.n}</div>
                        <div style={{fontSize:11,color:T.muted,marginTop:2}}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ══════ TAB: ASSESS ══════ */}
          {tab==="assess" && (
            <div style={{display:"grid",gap:18}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {/* Round 1 card */}
                {[
                  {id:1,r:r1,name:"Portfolio",period:"ส.ค. 2569 – ก.พ. 2570",color:ROUND_COLORS[1]},
                  {id:3,r:r3,name:"Admission",period:"7–13 พ.ค. 2570",color:ROUND_COLORS[3]},
                ].map(({id,r,name,period,color})=>(
                  <Card key={id} style={{borderTop:`3px solid ${color}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                      <div style={{background:`${color}12`,color,width:34,height:34,borderRadius:8,
                        display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14}}>
                        {id}
                      </div>
                      <div>
                        <div style={{fontWeight:600,fontSize:14}}>รอบ {id} {name}</div>
                        <div style={{fontSize:11.5,color:T.muted}}>{period}</div>
                      </div>
                      <div style={{marginLeft:"auto"}}><ChancePill chance={r.chance}/></div>
                    </div>
                    <Bar value={r.score} max={100} color={color} height={8}/>
                    <div style={{textAlign:"right",fontSize:11.5,color:T.muted,margin:"4px 0 12px"}}>{r.score}/100</div>
                    <div style={{display:"grid",gap:4}}>
                      {r.notes.map((n,i)=>(
                        <div key={i} style={{fontSize:12.5,color:noteColor(n.ok),display:"flex",gap:7,alignItems:"flex-start"}}>
                          <span style={{fontWeight:700,flexShrink:0}}>{noteIcon(n.ok)}</span>{n.t}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Faculty check */}
              {profile.wishFaculties.length>0 && (
                <Card>
                  <SectionTitle>คณะที่สนใจ — ตรวจสอบคุณสมบัติ</SectionTitle>
                  <div style={{display:"grid",gap:8}}>
                    {profile.wishFaculties.map(fid=>{
                      const f=FACULTIES_SIMPLE.find(x=>x.id===fid);
                      const g=parseFloat(profile.gpax)||0, ok=g>=f.minGPA;
                      return(
                        <div key={fid} style={{display:"flex",alignItems:"center",gap:12,
                          padding:"10px 14px",background:T.bg,borderRadius:10,
                          border:`1px solid ${ok?f.color+"30":T.red+"30"}`}}>
                          <span style={{fontSize:20}}>{f.icon}</span>
                          <div style={{flex:1}}>
                            <div style={{fontWeight:500,fontSize:13.5}}>{f.name}</div>
                            <div style={{fontSize:11.5,color:T.muted}}>GPAX ขั้นต่ำ {f.minGPA}</div>
                          </div>
                          <Chip c={ok?T.green:T.red}>{ok?"✓ ผ่านเกณฑ์ GPAX":"✕ GPAX ไม่ถึง"}</Chip>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* AI Advisor */}
              <Card>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                  <div style={{fontSize:24}}>🤖</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:14}}>AI Advisor — คำแนะนำส่วนตัว</div>
                    <div style={{fontSize:12,color:T.muted}}>วิเคราะห์โปรไฟล์ทั้งหมดโดย Claude AI</div>
                  </div>
                </div>

                {!aiTxt && !aiLoad && (
                  <button onClick={callAI} style={{background:T.accent,border:"none",borderRadius:9,
                    padding:"11px",color:"#fff",cursor:"pointer",fontFamily:"Prompt,sans-serif",
                    fontSize:13.5,fontWeight:600,width:"100%"}}>
                    ✨ วิเคราะห์โปรไฟล์และรับคำแนะนำ
                  </button>
                )}
                {aiLoad && (
                  <div style={{textAlign:"center",padding:28,color:T.muted,fontSize:13}}>
                    <div style={{fontSize:28,marginBottom:8}} className="spin">⚙️</div>
                    กำลังวิเคราะห์...
                  </div>
                )}
                {aiErr && <div style={{color:T.red,fontSize:13,padding:12,background:T.redLt,borderRadius:8}}>{aiErr}</div>}
                {aiTxt && (
                  <div>
                    <div style={{background:T.bg,borderRadius:10,padding:16,fontSize:13.5,lineHeight:1.9,
                      color:T.text,whiteSpace:"pre-wrap",maxHeight:480,overflowY:"auto"}}>{aiTxt}</div>
                    <button onClick={callAI} style={{marginTop:10,background:"none",border:`1px solid ${T.border}`,
                      borderRadius:8,padding:"7px 14px",color:T.sub,cursor:"pointer",fontFamily:"Prompt,sans-serif",fontSize:12.5}}>
                      🔄 วิเคราะห์ใหม่
                    </button>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* ══════ TAB: CRITERIA ══════ */}
          {tab==="criteria" && (
            <div style={{display:"grid",gap:18}}>
              {/* Search + filters */}
              <Card style={{padding:16}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:10,alignItems:"end"}}>
                  <div>
                    <FieldLabel>🔍 ค้นหามหาวิทยาลัย / คณะ</FieldLabel>
                    <Inp placeholder="พิมพ์ชื่อมหาวิทยาลัย หรือคณะที่สนใจ..."
                      value={searchQ} onChange={e=>{ setSearchQ(e.target.value); setSelUni(""); setSelFac(""); }}/>
                  </div>
                  <div>
                    <FieldLabel>มหาวิทยาลัย</FieldLabel>
                    <Sel value={selUni} onChange={e=>{ setSelUni(e.target.value); setSelFac(""); setSearchQ(""); }}
                      options={[{v:"",l:"— เลือกมหาวิทยาลัย —"},...UNIVERSITIES.map(u=>({v:u.id,l:`${u.short} — ${u.name.substring(0,18)}...`}))]}
                      style={{minWidth:240}}/>
                  </div>
                  {currentUni && (
                    <div>
                      <FieldLabel>คณะ</FieldLabel>
                      <Sel value={selFac} onChange={e=>setSelFac(e.target.value)}
                        options={[{v:"",l:"— ทุกคณะ —"},...currentUni.faculties.map(f=>({v:f.name,l:f.name}))]}
                        style={{minWidth:200}}/>
                    </div>
                  )}
                </div>
              </Card>

              {/* Detail: single faculty */}
              {currentFac && (
                <Card style={{borderLeft:`4px solid ${currentUni.color}`}} className="fadein">
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                    <img src={currentUni.logo} alt={currentUni.short} style={{width:44,height:44,objectFit:"contain",borderRadius:6,background:T.bg,padding:3,border:`1px solid ${T.border}`}} onError={e=>e.target.style.display="none"}/>
                    <div>
                      <div style={{fontSize:11,color:T.muted,fontWeight:500}}>{currentUni.name}</div>
                      <div style={{fontWeight:700,fontSize:16,color:T.text}}>{currentFac.name}</div>
                    </div>
                    {/* Total seats */}
                    <div style={{marginLeft:"auto",display:"flex",gap:8}}>
                      {Object.entries(currentFac.seats).filter(([,v])=>v>0).map(([r,v])=>(
                        <div key={r} style={{textAlign:"center",padding:"5px 10px",borderRadius:8,background:`${ROUND_COLORS[parseInt(r[1])]}10`,border:`1px solid ${ROUND_COLORS[parseInt(r[1])]}25`}}>
                          <div style={{fontWeight:700,fontSize:14,color:ROUND_COLORS[parseInt(r[1])]}}>{v}</div>
                          <div style={{fontSize:10,color:T.muted}}>รอบ{parseInt(r[1])}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{display:"grid",gap:12}}>
                    {currentFac.rounds.map(rd=>(
                      <div key={rd.r} style={{padding:"13px 16px",borderRadius:10,background:T.bg,
                        border:`1px solid ${ROUND_COLORS[rd.r]}25`,borderLeft:`3px solid ${ROUND_COLORS[rd.r]}`}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                          <Chip c={ROUND_COLORS[rd.r]}>รอบ {rd.r} {ROUND_NAMES[rd.r]}</Chip>
                          {rd.note && <span style={{fontSize:11.5,color:T.amber,fontStyle:"italic"}}>* {rd.note}</span>}
                        </div>
                        <div style={{fontSize:13.5,color:T.text,lineHeight:1.8}}>{rd.criteria}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Grid: all universities (or filtered) */}
              {!currentFac && (
                <div style={{display:"grid",gap:14}}>
                  {(searchQ ? filteredUnis : (currentUni?[currentUni]:UNIVERSITIES)).map(uni=>(
                    <Card key={uni.id} style={{borderLeft:`4px solid ${uni.color}`}}>
                      {/* Uni header */}
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14,
                        cursor:"pointer"}} onClick={()=>{ setSelUni(uni.id); setSelFac(""); setSearchQ(""); }}>
                        <img src={uni.logo} alt={uni.short} style={{width:40,height:40,objectFit:"contain",
                          borderRadius:6,background:T.bg,padding:2,border:`1px solid ${T.border}`}}
                          onError={e=>e.target.style.display="none"}/>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:700,fontSize:14,color:T.text}}>{uni.name}</div>
                          <div style={{fontSize:11.5,color:T.muted}}>
                            <a href={uni.website} target="_blank" rel="noreferrer"
                              style={{color:T.accent,textDecoration:"none"}}>{uni.website}</a>
                          </div>
                        </div>
                        <span style={{fontSize:12,color:T.muted}}>{uni.faculties.length} คณะ →</span>
                      </div>

                      {/* Faculty cards grid */}
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
                        {uni.faculties
                          .filter(f=>!searchQ||f.name.toLowerCase().includes(searchQ.toLowerCase()))
                          .map(f=>(
                          <div key={f.name} style={{padding:"11px 14px",borderRadius:10,
                            background:T.surface,border:`1px solid ${T.border}`,cursor:"pointer",
                            transition:"box-shadow .15s",boxShadow:"0 1px 2px rgba(0,0,0,.04)"}}
                            onClick={()=>{ setSelUni(uni.id); setSelFac(f.name); setSearchQ(""); }}
                            onMouseOver={e=>e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,.09)"}
                            onMouseOut={e=>e.currentTarget.style.boxShadow="0 1px 2px rgba(0,0,0,.04)"}>
                            <div style={{fontWeight:600,fontSize:13,marginBottom:7}}>{f.name}</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                              {Object.entries(f.seats).filter(([,v])=>v>0).map(([r,v])=>(
                                <Chip key={r} c={ROUND_COLORS[parseInt(r[1])]}>รอบ{parseInt(r[1])} {v} ที่</Chip>
                              ))}
                            </div>
                            <div style={{fontSize:11.5,color:T.accent,fontWeight:500}}>ดูเกณฑ์เพิ่มเติม →</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {filteredUnis.length===0 && searchQ && (
                <div style={{textAlign:"center",padding:40,color:T.muted,fontSize:14}}>
                  ไม่พบผลลัพธ์สำหรับ "{searchQ}"
                </div>
              )}
            </div>
          )}

          {/* ══════ TAB: CALENDAR ══════ */}
          {tab==="calendar" && (
            <div style={{display:"grid",gap:18}}>
              {/* Round cards */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
                {[
                  {id:1,name:"Portfolio",period:"ส.ค. 2569 – ก.พ. 2570",announce:"10–11 มี.ค. 2570",
                    desc:"ยื่นแฟ้มสะสมผลงาน ไม่มีสอบกลาง",
                    criteria:["GPAX (ขั้นต่ำตามคณะ)","Portfolio / ผลงาน","รางวัล / กิจกรรม","สัมภาษณ์"]},
                  {id:2,name:"Quota",period:"13 มี.ค. 2570 เป็นต้นไป",announce:"3–4 พ.ค. 2570",
                    desc:"โควตาพื้นที่ โครงการพิเศษ สมัครที่มหาวิทยาลัย",
                    criteria:["GPAX","TGAT / TPAT","A-Level บางวิชา","โควตาภูมิภาค"]},
                  {id:3,name:"Admission",period:"7–13 พ.ค. 2570",announce:"22, 27 พ.ค. 2570",
                    desc:"คัดเลือกกลาง ใช้คะแนนสอบกลาง",
                    criteria:["TGAT","TPAT","A-Level","GPAX"]},
                  {id:4,name:"Direct",period:"29 พ.ค. – 15 มิ.ย. 2570",announce:"7, 18 มิ.ย. 2570",
                    desc:"มหาวิทยาลัยรับตรงเพื่อเติมที่นั่ง",
                    criteria:["แล้วแต่มหาวิทยาลัย","อาจสอบสัมภาษณ์"]},
                ].map(r=>(
                  <Card key={r.id} style={{borderTop:`3px solid ${ROUND_COLORS[r.id]}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <div style={{background:`${ROUND_COLORS[r.id]}12`,color:ROUND_COLORS[r.id],
                        width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",
                        justifyContent:"center",fontWeight:700,fontSize:14}}>{r.id}</div>
                      <div style={{fontWeight:700,fontSize:14,color:ROUND_COLORS[r.id]}}>{r.name}</div>
                    </div>
                    <div style={{fontSize:12,color:T.muted,marginBottom:4}}>📅 {r.period}</div>
                    <div style={{fontSize:12,color:T.sub,marginBottom:10,lineHeight:1.7}}>{r.desc}</div>
                    <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:600}}>เกณฑ์หลัก</div>
                    {r.criteria.map((c,i)=>(
                      <div key={i} style={{fontSize:12,color:T.sub,display:"flex",gap:6,alignItems:"center",marginBottom:3}}>
                        <span style={{color:ROUND_COLORS[r.id],fontWeight:700}}>·</span>{c}
                      </div>
                    ))}
                    <div style={{marginTop:10,padding:"6px 10px",background:`${ROUND_COLORS[r.id]}08`,
                      borderRadius:7,fontSize:11.5,color:ROUND_COLORS[r.id],fontWeight:500}}>
                      ประกาศผล: {r.announce}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Timeline */}
              <Card>
                <SectionTitle>Timeline สำคัญ TCAS70</SectionTitle>
                <div style={{display:"grid",gap:0}}>
                  {[
                    ["ส.ค. 2569","เริ่มรับสมัครรอบ 1 Portfolio (ระบบมหาวิทยาลัย)",1],
                    ["พ.ย. 2569","สมัครสอบ TGAT/TPAT รอบที่ 2-5",2],
                    ["ม.ค. 2570","สอบ TGAT/TPAT 2-5 (30 ม.ค. – 1 ก.พ.)",2],
                    ["ก.พ. 2570","ประกาศผล TGAT/TPAT | ประกาศผลรอบ 1 Portfolio",1],
                    ["10–11 มี.ค. 2570","ประกาศผล & ยืนยันสิทธิ์รอบ 1",1],
                    ["13–15 มี.ค. 2570","สอบ A-Level ทุกวิชา",3],
                    ["13 มี.ค. 2570","เริ่มรับสมัครรอบ 2 Quota (ระบบมหาวิทยาลัย)",2],
                    ["เม.ย. 2570","ประกาศผล A-Level | สอบ TPAT1 (กสพท)",3],
                    ["3–4 พ.ค. 2570","ประกาศผล & ยืนยันสิทธิ์รอบ 2 Quota",2],
                    ["7–13 พ.ค. 2570","รับสมัครรอบ 3 Admission (mytcas.com)",3],
                    ["22–27 พ.ค. 2570","ประกาศผลรอบ 3 Admission (ครั้งที่ 1–2)",3],
                    ["29 พ.ค.–15 มิ.ย. 2570","รับสมัครรอบ 4 Direct Admission",4],
                    ["7, 18 มิ.ย. 2570","ประกาศผลรอบ 4 Direct Admission",4],
                  ].map(([date,event,r],i)=>(
                    <div key={i} style={{display:"flex",gap:0,alignItems:"stretch"}}>
                      <div style={{width:160,flexShrink:0,paddingRight:16,paddingTop:14,paddingBottom:14,
                        textAlign:"right",fontSize:12,color:T.sub,fontWeight:500}}>{date}</div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                        <div style={{width:2,flex:1,background:i===0?"transparent":T.borderSoft}}/>
                        <div style={{width:12,height:12,borderRadius:"50%",background:ROUND_COLORS[r],flexShrink:0,zIndex:1}}/>
                        <div style={{width:2,flex:1,background:T.borderSoft}}/>
                      </div>
                      <div style={{flex:1,padding:"12px 0 12px 16px",fontSize:13,color:T.text}}>{event}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tips */}
              <Card>
                <SectionTitle>เคล็ดลับสำคัญ</SectionTitle>
                <div style={{display:"grid",gap:10}}>
                  {[
                    {e:"⚠️",h:"สละสิทธิ์ได้เพียง 1 ครั้ง",d:"หากเกินนั้นจะไม่สามารถสมัครรอบถัดไปได้ ต้องวางแผนให้ดี",c:T.amber,bg:T.amberLt},
                    {e:"📱",h:"mytcas.com ศูนย์กลางรอบ 3",d:"รอบ 3 Admission สมัครผ่าน student.mytcas.com เท่านั้น",c:T.accent,bg:T.accentLt},
                    {e:"🎯",h:"เตรียม Portfolio ตั้งแต่ตอนนี้",d:"รวบรวมรางวัล กิจกรรม ผลงานให้ครบก่อนส.ค. 2569",c:T.purple,bg:T.purpleLt},
                    {e:"📊",h:"A-Level สำคัญสำหรับรอบ 3",d:"คะแนน A-Level เป็นองค์ประกอบหลักในรอบ Admission ควรเตรียมจริงจัง",c:T.green,bg:T.greenLt},
                  ].map((t,i)=>(
                    <div key={i} style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,
                      background:t.bg,border:`1px solid ${t.c}20`}}>
                      <span style={{fontSize:20,flexShrink:0}}>{t.e}</span>
                      <div>
                        <div style={{fontWeight:600,fontSize:13.5,color:t.c,marginBottom:3}}>{t.h}</div>
                        <div style={{fontSize:13,color:T.sub,lineHeight:1.6}}>{t.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

        </main>

        {/* ── FOOTER ── */}
        <footer style={{borderTop:`1px solid ${T.border}`,padding:"14px 20px",marginTop:20,
          display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <PSLogo size={28}/>
            <span style={{fontSize:12,color:T.muted}}>โรงเรียนโพธิสารพิทยากร | Potisarnpittayakorn School</span>
          </div>
          <div style={{fontSize:11.5,color:T.light}}>
            ข้อมูลอ้างอิง: mytcas.com · admissionpremium.com · eduzones.com | TCAS70 ปีการศึกษา 2570
          </div>
        </footer>
      </div>
    </>
  );
}
