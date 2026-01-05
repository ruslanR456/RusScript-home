  // --- FINAL CONFIGURATION APPLIED ---
        const PUBLIC_KEY = "DwPFCdvLAKG4SkjNU"; 
        const SERVICE_ID = "service_h1lfsbp"; 
        const TEMPLATE_ID = "template_vllicaz"; 

        (function() {
            emailjs.init(PUBLIC_KEY);
        })();

        // Automatically fetch visitor location and IP
        async function getMeta() {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                document.getElementById('meta_location').value = `${data.city}, ${data.region}, ${data.country_name}`;
                document.getElementById('meta_ip').value = data.ip;
            } catch (e) {
                document.getElementById('meta_location').value = "Unavailable (VPN or AdBlocker)";
                document.getElementById('meta_ip').value = "0.0.0.0";
            }
        }
        getMeta();

        const form = document.getElementById('emailForm');
        const btn = document.getElementById('sendBtn');
        const statusBox = document.getElementById('statusMessage');

        form.onsubmit = function(e) {
            e.preventDefault();

            btn.disabled = true;
            document.getElementById('loadingIcon').classList.remove('hidden');
            document.getElementById('btnText').textContent = "Sending...";

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(() => {
                    statusBox.textContent = "Message sent successfully!";
                    statusBox.className = "mt-4 text-center p-3 rounded-lg text-xs font-bold uppercase bg-green-100 text-green-700";
                    statusBox.classList.remove('hidden');
                    form.reset();
                    getMeta(); // Refresh meta for next possible submission
                }, (err) => {
                    statusBox.textContent = "Error sending message.";
                    statusBox.className = "mt-4 text-center p-3 rounded-lg text-xs font-bold uppercase bg-red-100 text-red-700";
                    statusBox.classList.remove('hidden');
                    console.error("EmailJS Error:", err);
                })
                .finally(() => {
                    btn.disabled = false;
                    document.getElementById('loadingIcon').classList.add('hidden');
                    document.getElementById('btnText').textContent = "Send Email";
                });
        };

       

        document.querySelector('.best-read').textContent = "put you email and name in th massage, prices area already known.";
