import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { Image } from "antd";

import { ThemeContext } from "core/providers/theme";
import { TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import CustomInput from "../../components/CustomInput/CustomInput";
import MessageComponent from "../../components/MessageComponent";
import styles from "./ChatSection.module.scss";
import { classes } from "./ChatSection.styles";
import { ReactComponent as Attachment } from "../../themes/base/assets/icons/attachment.svg";

const ChatSection = ({ data }) => {
  const { getImage } = useContext(ThemeContext);
  const intl = useIntl();
  const responsive = useResponsive();
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState(data?.records);

  const handleInputChange = (val) => {
    setMessageValue(val.target.value);
  };

  const handlSend = () => {
    setMessages([
      ...messages,
      {
        id: 156,
        reply_text: messageValue,
        file_path: "xxxxxxxxxxxxxxxx",
        from: {
          id: 1,
          name: "xxxxxxxxxxx",
          profile_photo:
            "https://cmib-portal-icai.s3.ap-south-1.amazonaws.com/cmib-job-portal/admin/b8882b3c-cd5f-414d-834b-5c0b867d70fb.",
        },
        to: {
          id: 2,
          name: "xxxxxxxxxxxxxxx",
          profile_photo:
            "https://cmib-portal-icai.s3.ap-south-1.amazonaws.com/cmib-job-portal/admin/b8882b3c-cd5f-414d-834b-5c0b867d70fb.",
        },
        created_at: "xxxxxxxxx",
      },
    ]);
    setMessageValue("");
  };

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <div className={styles.messagesContainer}>
          {messages.map((item) => {
            return <MessageComponent messageData={item} />;
          })}
        </div>
      }
      topSectionStyle={{ flex: 1 }}
      bottomSectionStyle={
        responsive.isMd
          ? classes.bottomSectionStyle
          : classes.mobileBottomSectionStyle
      }
      bottomSection={
        <form className={styles.textInputFormContainer}>
          <TwoColumn
            className={styles.textInputContainer}
            leftSectionStyle={{ flex: 1 }}
            leftSection={
              <CustomInput
                customContainerStyles={styles.customContainerStyles}
                customInputStyles={styles.customInputStyles}
                onChange={(val) => handleInputChange(val)}
                SuffixIcon={Attachment}
                onSuffixElementClick={() => {}}
                value={messageValue}
                placeholder={intl.formatMessage({ id: "label.typeHere" })}
              />
            }
            rightSection={
              <Image
                style={classes.sendIcon}
                src={getImage("activeSend")}
                preview={false}
                onClick={() => {
                  handlSend();
                }}
              />
            }
          />
        </form>
      }
    />
  );
};

export default ChatSection;
