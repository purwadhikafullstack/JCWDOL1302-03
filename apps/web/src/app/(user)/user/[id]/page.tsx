export default function UpdateUser({ params }: { params: { id: number } }) {
  return (
    <>
      <div>{params.id}</div>
    </>
  );
}
