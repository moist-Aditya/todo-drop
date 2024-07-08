const DropIndicator = ({
  beforeId,
  categoryId,
}: {
  beforeId?: string
  categoryId: string
}) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-category={categoryId}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  )
}

export default DropIndicator
