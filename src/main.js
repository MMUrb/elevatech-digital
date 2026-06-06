import './style.css';

/* ---------- CONFIG ----------
   WEB3FORMS_KEY comes from your .env file (see .env.example) and falls back to a
   placeholder so the form clearly signals when it isn't wired up yet.
   Calendly links are set per service via the data-calendly attribute in index.html. */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

/* ---------- ROUTER ---------- */
const pages = ['home','services','about','contact'];
function route(){
  let hash = (location.hash.replace('#','') || 'home').split('?')[0];
  if(hash === 'book') hash = 'services';
  if(!pages.includes(hash)) hash = 'home';
  pages.forEach(p=>{
    document.getElementById('page-'+p).classList.toggle('active', p===hash);
  });
  document.querySelectorAll('.nav-links a[data-nav]').forEach(a=>{
    a.classList.toggle('active', a.dataset.nav===hash);
  });
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
  window.scrollTo({top:0,behavior:'instant'in window?'instant':'auto'});
}
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);

/* ---------- MOBILE MENU ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=>{
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

/* ---------- BOOK BUTTONS (Calendly popup) ---------- */
document.querySelectorAll('.book-link').forEach(b=>{
  b.addEventListener('click', e=>{
    e.preventDefault();
    const url = b.dataset.calendly;
    const ready = window.Calendly && url && !url.includes('YOUR_CALENDLY_URL');
    if(ready){
      Calendly.initPopupWidget({url});
    }else{
      alert("Booking not connected yet.\n\nService: " + b.dataset.service +
            "\n\nAdd a data-calendly link for this service in index.html to go live.");
      document.getElementById('calendly-embed').scrollIntoView({behavior:'smooth'});
    }
  });
});

/* ---------- CONTACT FORM (Web3Forms) ---------- */
const form = document.getElementById('contactForm');
const msg = document.getElementById('contactMsg');
const accessKeyInput = form.querySelector('[name=access_key]');
accessKeyInput.value = WEB3FORMS_KEY;
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(accessKeyInput.value === 'YOUR_WEB3FORMS_ACCESS_KEY'){
    msg.className='form-msg err';
    msg.textContent='Form not connected yet — add your Web3Forms key to .env to go live.';
    return;
  }
  msg.className='form-msg'; msg.style.display='block'; msg.textContent='Sending…';
  try{
    const res = await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const data = await res.json();
    if(data.success){
      msg.className='form-msg ok'; msg.textContent='Thanks — your message has been sent!';
      form.reset();
      accessKeyInput.value = WEB3FORMS_KEY; // restore after reset()
    }else{ throw new Error(); }
  }catch(err){
    msg.className='form-msg err'; msg.textContent='Something went wrong. Please try again.';
  }
});
