import SectionTitle from '@/components/SectionTitle';
import WidgetItem from '@/components/WidgetItem';

const CivilSevant = ({ titleReplace }: { titleReplace?: string }) => {
  const arr = Array.from({ length: 4 }, (_, index) => index + 1);

  return (
    <div id="CivilSevant">
      <SectionTitle
        title={titleReplace || 'THƯỜNG TRỰC TỈNH ỦY'}
        className="mt-7 mb-4"
      />
      <WidgetItem className="tablegrid" widgetName="LEADERS" />
    </div>
  );
};

export default CivilSevant;
