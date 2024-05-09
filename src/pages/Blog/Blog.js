import React from 'react'
import CardItemB from './CardItemB';
import './Blog.css';

function Blog() {
    return (
        <div className='cards'>
            <h1>Elderly Squire Blog</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItemB
                            src='images/Blog1.png'
                            text='Before you can apply for this ID, you must first qualify for it. To qualify, you must meet the following eligibility criteria:

                            Sixty (60) years old or over
                            A citizen of the Philippines
                            Resident of the city or municipality where you are applying for at least six (6) months prior to your application
                            Documentary Requirements
                            Once you have ensured that you are indeed qualified for a senior citizen ID, you must also prepare the following documents:
                            
                            Duly accomplished application form issued by the Office of the Senior Citizens Affairs (OSCA).
                            Recent 1″ x 1″ ID photograph
                            Birth certificate or any public document indicating the applicant’s age and Filipino citizenship.
                            Valid ID that can be presented as proof of residency and/or two (2) proofs of billing or mails under the applicant’s name.
                            Some of the valid IDs accepted by the OSCA include:
                            
                            Commission on Elections (COMELEC) Voter’s ID;
                            Driver’s License;
                            NBI Clearance;
                            Police Clearance;
                            Old residence certificate;
                            Postal ID;
                            Any combination of identification documents confirming your name, date of birth and present address.
                            If you need a complete list of other valid IDs that you can use, you may check our previous article on Complete List of Valid Philippine IDs You Need to Have as a Filipino.
                            
                            Note that the local OSCA via the city or municipal Social Welfare District Office (CSWDO/MSWDO) may ask for other documents, in the event that you are unable to provide some of the required documents.
                            
                            The application forms are typically available at your local Office of Senior Citizens Affair (OSCA) or at the barangay hall. However, some government offices also made the form available for download through their website. You can simply do a quick search online to see where it is available for you to download and fill out before you drop by the CSWDO or MSWDO near you.
                            "Link https://thepinoyofw.com/apply-senior-citizen-id-philippines/"'
                            path='/'
                        />
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default Blog;