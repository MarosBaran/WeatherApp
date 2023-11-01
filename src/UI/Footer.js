import classes from "./Footer.module.css";
import linkedInLogo from "../assets/linkedInLogo.png";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <h4>Developed by Maroš Baran 2023</h4>
      <a
        href="https://www.linkedin.com/in/maro%C5%A1-baran-8b7419280/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={linkedInLogo} alt="Logo of LinkedIn" />
      </a>
    </footer>
  );
};

export default Footer;
