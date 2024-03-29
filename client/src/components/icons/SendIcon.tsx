import React from "react";

interface SendIconProps {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}

const SendIcon: React.FC<SendIconProps> = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.07 8.51L9.51 4.23C3.76 1.35 1.4 3.71 4.28 9.46L5.15 11.2C5.4 11.71 5.4 12.3 5.15 12.81L4.28 14.54C1.4 20.29 3.75 22.65 9.51 19.77L18.07 15.49C21.91 13.57 21.91 10.43 18.07 8.51ZM14.84 12.75H9.44C9.03 12.75 8.69 12.41 8.69 12C8.69 11.59 9.03 11.25 9.44 11.25H14.84C15.25 11.25 15.59 11.59 15.59 12C15.59 12.41 15.25 12.75 14.84 12.75Z"
        fill={fill}
      />
    </svg>
  );
};

export default SendIcon;
