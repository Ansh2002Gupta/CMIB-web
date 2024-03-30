import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Input, Image } from "antd";

import { ThemeContext } from "core/providers/theme";

import styles from "./SearchableComponent.module.scss";

const SearchableComponent = ({
  allowClear,
  customSearchBar,
  customSearchBarContainer,
  customSearchIcon,
  handleOnUserSearch,
  placeholder,
  searchedValue,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  return (
    <div
      className={[styles.searchBarContainer, customSearchBarContainer].join(
        " "
      )}
    >
      <Input
        prefix={
          <Image
            src={getImage("searchIcon")}
            className={[styles.searchIcon, customSearchIcon].join(" ")}
            preview={false}
          />
        }
        placeholder={placeholder}
        allowClear={allowClear}
        className={[styles.searchBar, customSearchBar].join(" ")}
        value={searchedValue}
        onChange={(e) => handleOnUserSearch(e.target.value)}
      />
    </div>
  );
};

SearchableComponent.defaultProps = {
  allowClear: true,
  customSearchBar: "",
  customSearchBarContainer: "",
  customSearchIcon: "",
  handleOnUserSearch: () => {},
  placeholder: "",
  searchedValue: "",
};

SearchableComponent.propTypes = {
  allowClear: PropTypes.bool,
  customSearchBar: PropTypes.string,
  customSearchBarContainer: PropTypes.string,
  customSearchIcon: PropTypes.string,
  handleOnUserSearch: PropTypes.func,
  placeholder: PropTypes.string,
  searchedValue: PropTypes.string,
};

export default SearchableComponent;
