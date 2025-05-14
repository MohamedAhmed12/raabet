const UkFlag = () => (
  <svg width="24" height="16" viewBox="0 0 60 30">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 h-30 z M0,0 h30 v15 h-30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 l60,30 M60,0 l-60,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 l60,30 M60,0 l-60,30"
        stroke="#C8102E"
        strokeWidth="4"
        clipPath="url(#t)"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export default UkFlag;
