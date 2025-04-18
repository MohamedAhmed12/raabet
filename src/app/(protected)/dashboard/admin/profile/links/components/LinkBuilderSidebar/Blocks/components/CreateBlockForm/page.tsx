import {blocks, blockTitle, BlockType} from "../../../../../types/block";
import {CreateBlockFormFooter} from "./components/Footer";
import {CreateBlockFormHeader} from "./components/Header";

export const CreateBlockForm = ({
  type,
  onClose,
}: {
  type: BlockType;
  onClose: () => void;
}) => {
  const BlockComponent = blocks[type];

  return (
    <div className="flex flex-col absolute top-0 left-0 w-[520px] z-[9] h-screen font-noto-sans font-medium !bg-white w-[370px] border-1 border-r-[#d3d3d3]">
      <CreateBlockFormHeader title={blockTitle[type]} />

      <BlockComponent />

      <CreateBlockFormFooter onClose={onClose} />
    </div>
  );
};
