import './partner.css';

function Partner() {
    return (
        <footer id="footer-contact" className="bg-dark">
            <p className="footer-heading">Connect with - <strong>Piyush Bhatnagar</strong></p>
            <h5 className="footer-contact-info">📞 +91 9315984683 | 📧 piyushbhatnagar092@gmail.com</h5>
            <ul className="horizontal-list social-icons">
                <li>
                    <a href="https://www.linkedin.com/in/bhatnagar-piyush/" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-linkedin-square"></i>
                    </a>
                </li>
                <li>
                    <a href="mailto:piyushbhatnagar092@gmail.com">
                        <i className="fa fa-envelope"></i>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/PiyushBhatnagar09" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-github"></i>
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Partner;
