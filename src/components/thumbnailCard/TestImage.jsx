import React, { useState } from "react";
import { Col, Image } from "antd";

const TestImage = (props) => {

    const { item, thumbnails } = props;
    const [showImage, setShowImage] = useState(true)

    return (
        <>
            {showImage ? <Col xs={thumbnails?.length === 1 ? 24 : 12} >
                <Image preview={false} src={item} fallback="" onError={(err) => setShowImage(false)} className='rounded-md aspect-[16/9] object-cover' /></Col>
                : null}
        </>
    )
}

export default TestImage;