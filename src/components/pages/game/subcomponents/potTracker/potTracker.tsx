interface Props {
  pot: number;
}

export default function PotTracker({ pot }: Props) {
  return (
    <>
      <div>Pot: {pot}</div>
    </>
  );
}
