interface Props {
  smallBlind: number;
}

export default function BlindsDisplay({ smallBlind }: Props) {
  return (
    <>
      <div>
        Blinds: {smallBlind}/{smallBlind * 2}
      </div>
    </>
  );
}
