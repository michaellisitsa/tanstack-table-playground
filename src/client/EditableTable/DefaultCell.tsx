import React from "react";

function DefaultCell({
  getValue,
  row: { index },
  column: { id },
  table,
}: {
  getValue: any;
  row: {
    index: any;
  };
  column: {
    id: any;
  };
  table: any;
}) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

export default DefaultCell;
