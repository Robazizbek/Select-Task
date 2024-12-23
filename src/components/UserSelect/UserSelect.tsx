import { Select } from "components/Select/Select";
import React from "react";
import { UserSelectProps } from "types/types";

export const UserSelect: React.FC<UserSelectProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  renderOption,
  label,
  loading,
  hasMore,
  onScrollEnd,
}) => {
  const handleScroll = (event: React.UIEvent) => {
    const bottom =
      event.currentTarget.scrollHeight ===
      event.currentTarget.scrollTop + event.currentTarget.clientHeight;
    if (bottom && hasMore && !loading) {
      onScrollEnd();
    }
  };
  return (
    <div className="user-select-container">
      <Select
        options={options}
        handleScroll={handleScroll}
        optionLayout={renderOption}
        selectedOption={selectedOption}
        onOptionSelect={onOptionSelect}
        label={label}
      />
      <div className="user-dropdown">
        {loading && <div className="user-loading">Loading...</div>}
        {!hasMore && <div className="user-no-more">No more users to load</div>}
      </div>
    </div>
  );
};
