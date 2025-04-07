import React from 'react';
import './PrivacyPolicy.scss';
import '../Styles/Styles.scss';

export default function PrivacyPolicy() {
    return (
        <div className="privacy-policy-container">
            <h1 className='font-fam'>Privacy Policy</h1>
            <p>Last updated: August 28, 2024</p>

            <section>
                <h2 className="font-fam">Introduction</h2>
                <p>
                    Welcome to our Privacy Policy. Your privacy is critically important to us. 
                    Our website address is: https://chrysalys.art.
                </p>
            </section>

            <section>
                <h2 className="font-fam">Information We Collect</h2>
                <p>
                    We collect various types of information in connection with the services we provide, 
                    including personal data and non-personal data.
                </p>
            </section>

            <section>
                <h2 className="font-fam">How We Use Your Information</h2>
                <p>
                    The information we collect is used to improve the services we offer, to provide 
                    personalized services to you, and to fulfill legal obligations.
                </p>
            </section>

            <section>
                <h2 className="font-fam">Sharing Your Information</h2>
                <p>
                    We do not share your personal information with third parties except as necessary to 
                    provide our services or as required by law.
                </p>
            </section>

            <section>
                <h2 className="font-fam">Security</h2>
                <p>
                    We take the security of your information seriously and use industry-standard measures 
                    to protect it.
                </p>
            </section>

            <section>
                <h2 className="font-fam">Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal information. 
                    You may also object to the processing of your data.
                </p>
            </section>

            <section>
                <h2 className="font-fam">Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    changes by posting the new Privacy Policy on this page.
                </p>
            </section>

            <section>
                <h2 className="font-fam">Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at 
                    support@chrysalys.art.
                </p>
            </section>
        </div>
    );
}
