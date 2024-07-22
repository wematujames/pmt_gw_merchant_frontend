import React from "react";
import { Button, Result } from "antd";
import styles from "../../../../utility.module.css";

const EmailVerificationSuccess: React.FC = () => (
  <Result
    className={styles.fscontainer}
    status="success"
    title="Email verification successful"
    subTitle=""
    extra={
      <Button type="primary" key="console" href="/nerasol/auth/login">
        Go To Home
      </Button>
    }
  />
);

export default EmailVerificationSuccess;
