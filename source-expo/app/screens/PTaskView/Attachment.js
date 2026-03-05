import { Fragment } from 'react';
import { PAttachmentsInTaskView } from '@/data';
import { CardFileAttachment } from '@/components';

const Attachment = () => {
  return (
    <Fragment>
      {PAttachmentsInTaskView.map((item, index) => (
        <CardFileAttachment
          style={{ paddingHorizontal: 0 }}
          key={index}
          icon={item.icon}
          name={item.name}
          percent={item.percent}
          size={item.size}
          backgroundIcon={item.backgroundIcon}
          onPress={() => {}}
        />
      ))}
    </Fragment>
  );
};

export default Attachment;
