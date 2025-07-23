import { useFetchWidget, useFetchWidgetSlot } from '@/hooks/useWidget';
import React, { useEffect, useRef } from 'react';

interface TableWrapperProps {
  html: string; // không dùng trong component này
}

const WidgetItem = ({
  className,
  widgetName,
}: {
  className?: string;
  widgetName?: string;
}) => {
  const { data: dataWidgetSlot } = useFetchWidgetSlot(widgetName || '');
  const { data: dataWidget } = useFetchWidget(dataWidgetSlot?.useWidget || '');
  const containerRef = useRef<HTMLDivElement>(null);

  // 👇 chạy lại mỗi khi nội dung widget thay đổi
  useEffect(() => {
    if (!dataWidget?.content) return;

    const hideEmptyCellsInContainer = () => {
      if (window.innerWidth <= 768 && containerRef.current) {
        const tds = containerRef.current.querySelectorAll('td');
        tds.forEach((td) => {
          const text = td.textContent?.trim() ?? '';
          const html = td.innerHTML.trim();

          const hasMeaningfulElement = td.querySelector(
            'a, img, video, iframe, svg'
          );

          const htmlWithoutNbsp = html
            .replace(/(&nbsp;|<br\s*\/?>)/gi, '')
            .trim();

          const isTrulyEmpty =
            text === '' && !hasMeaningfulElement && htmlWithoutNbsp === '';

          if (isTrulyEmpty) {
            td.style.display = 'none';
          }
        });
      }
    };

    hideEmptyCellsInContainer();
    window.addEventListener('resize', hideEmptyCellsInContainer);

    return () => {
      window.removeEventListener('resize', hideEmptyCellsInContainer);
    };
  }, [dataWidget?.content]);

  return (
    <div
      className={className}
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: dataWidget?.content || '' }}
    ></div>
  );
};

export default React.memo(WidgetItem);
