import React, { useContext, useState } from "react";
import { Image, Typography } from "antd";
import { FormattedMessage } from "react-intl";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";
import useResponsive from "core/hooks/useResponsive";

import CheckBoxListComponent from "../../components/CheckBoxListComponent";
import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import CustomTextEditor from "../../components/CustomTextEditor";
import Chip from "../../components/Chip/Chip";
import FileUpload from "../../components/FileUpload/FileUpload";
import MarkRequired from "../../components/MarkRequired";
import { formatDate, getValidUrl } from "../../constant/utils";
import PhoneInput from "../../components/PhoneInput/PhoneInput";
import { classes } from "./DetailsCard.styles";
import styles from "./DetailsCard.module.scss";
import { useIntl } from "react-intl";

const DetailsCard = ({
  customHeaderStyles,
  customLabelStyles,
  customMainStyles,
  customPhoneInputStyles,
  customPhoneSelectStyles,
  customValueStyles,
  isSingleComponent,
  isEditable,
  details,
  headerText,
  onBlur,
  onChangeValue,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [deletedImage, setDeletedImage] = useState([]);
  const responsive = useResponsive();

  const renderView = (item) => {
    return (
      <TwoRow
        key={item.key}
        className={[
          item.fullWidth && styles.gridItem,
          item?.remainWidth && responsive?.isMd && styles.remainWidth,
          styles.viewItemStyle,
        ].join(" ")}
        topSection={
          item?.label ? (
            <Typography
              className={[styles.customLabelStyles, customLabelStyles].join(
                " "
              )}
            >
              {intl.formatMessage({ id: item?.label })}&nbsp;
              {item?.isMandatory && <MarkRequired />}
            </Typography>
          ) : (
            <></>
          )
        }
        bottomSection={
          item?.isImage ? (
            <div className={styles.imageContaier}>
              <Image
                src={item.value ? item?.value : getImage("company_placeholder")}
                className={styles.logoStyle}
                alt={"company_logo"}
              />
            </div>
          ) : item?.isHtmlElement ? (
            <CustomTextEditor
              value={item?.value}
              disabled
              quillContainerStyle={classes.quillContainerStyle}
              quilStyle={classes.quilStyle}
            />
          ) : item.isArray && item?.value !== "--" ? (
            <div className={styles.chipContainer}>
              {item?.value?.map((e) => {
                return (
                  <div>
                    <Chip
                      label={
                        item?.isObject ? e.name : item?.isLocation ? e.city : e
                      }
                      customContainerStyles={styles.customChipContainerStyles}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <Typography
              className={[
                styles.customValueStyles,
                customValueStyles,
                item?.isCapitalize && styles.capitalize,
              ].join(" ")}
            >
              {item?.isWebsite ? (
                <a
                  href={getValidUrl(item?.value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={classes.linkStyles}
                >
                  <FormattedMessage
                    id={item?.value}
                    defaultMessage={item?.value}
                  />
                  &nbsp;
                </a>
              ) : item?.isToggle ? (
                intl.formatMessage({ id: `toggle.${item?.value}` })
              ) : item?.isStatus ? (
                intl.formatMessage({ id: `toggle.${item?.value}` })
              ) : item?.isDate ? (
                formatDate(item?.value)
              ) : item.isYear ? (
                `${item?.value} ${
                  item?.value === 1
                    ? intl.formatMessage({ id: "label.year" })
                    : intl.formatMessage({ id: "label.years" })
                }`
              ) : (
                item?.value
              )}
            </Typography>
          )
        }
      />
    );
  };

  const renderEditable = (item) => {
    const handleUploadImage = (key, url) => {
      if (key === "profile_photo_url") {
        onChangeValue(item?.key, url);
      }
      if (key === "profile_photo") {
        onChangeValue(item?.keyName, url);
      }
    };

    if (item?.isCheckBoxList) {
      return (
        <CheckBoxListComponent
          customContainerStyles={styles.gridItem}
          selectedBox={item?.value}
          options={item.options}
          handleSelectBox={(val) => {
            onChangeValue(item.key, val);
          }}
        />
      );
    }
    if (item?.isImage) {
      return (
        <FileUpload
          customContaierStyles={styles.customContaierStyles}
          isCompany={item?.isCompany}
          isFormEditable={true}
          isNotAddable={true}
          userProfilePic={item?.value}
          updateUserData={handleUploadImage}
          deletedImage={deletedImage}
          setDeletedImage={setDeletedImage}
        />
      );
    }
    if (item?.isPhone) {
      return (
        <PhoneInput
          errorMessage={item?.error}
          isError={!!item?.error}
          label={item?.label && intl.formatMessage({ id: item?.label })}
          isRequired={item?.isMandatory}
          value={item?.value}
          mobilePrefix={item?.countryValue}
          disabled={item?.isDisabled}
          customInputStyles={[
            styles.text,
            styles.input,
            customPhoneInputStyles,
          ].join(" ")}
          customSelectInputStyles={[
            styles.selectInput,
            customPhoneSelectStyles,
          ].join(" ")}
          customLabelStyles={styles.customLabelStyles}
          onChange={(val) => {
            onChangeValue(item?.key, val);
          }}
          selectOptions={item?.selectOptions}
          defaultSelectValueString="+91"
          onSelectItem={(val) =>
            onChangeValue(item?.countryKey, val.target.value)
          }
          placeholder={intl.formatMessage({ id: item?.placeholder })}
          onBlur={() => {
            onBlur(item?.key);
          }}
        />
      );
    }
    return (
      <CustomInput
        errorMessage={item?.error}
        isError={!!item?.error}
        customContainerStyles={item.fullWidth && styles.gridItem}
        customLabelStyles={styles.customLabelStyles}
        key={item.key}
        placeholder={intl.formatMessage({ id: item?.placeholder })}
        label={item?.label && intl.formatMessage({ id: item?.label })}
        isRequired={item?.isMandatory}
        value={item?.value}
        onBlur={() => {
          onBlur(item?.key);
        }}
        onChange={(val) => {
          item?.type === "inputNumber"
            ? onChangeValue(item?.key, val)
            : onChangeValue(item?.key, val.target.value);
        }}
        onSelectItem={(val) => {
          onChangeValue(item?.key, val.target.value);
        }}
        customInputNumberStyles={styles.customInputNumberStyles}
        customInputStyles={styles.customInputStyles}
        type={item?.type}
        controls={item?.controls}
        selectOptions={item?.selectOptions}
        rows={item?.rows}
        maxLength={item.maxLength}
      />
    );
  };

  return (
    <TwoRow
      style={{ ...classes.mainStyle, ...customMainStyles }}
      topSection={
        headerText && (
          <Typography
            className={[styles.customHeaderStyles, customHeaderStyles].join(
              " "
            )}
          >
            {headerText}
          </Typography>
        )
      }
      bottomSection={
        <CustomGrid
          customStyle={[
            styles.customStyle,
            isSingleComponent && styles.singleGrid,
          ].join(" ")}
        >
          {details?.map((item) => {
            return isEditable ? renderEditable(item) : renderView(item);
          })}
        </CustomGrid>
      }
    />
  );
};

export default DetailsCard;
