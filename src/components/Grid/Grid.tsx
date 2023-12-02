
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { GifsResult } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'

function Grid({ result }: { result: GifsResult | undefined}) {
  return (
    <>
      {result &&
        result.data &&
        result.data.length > 0 &&
        <Row>
          {result.data.map((gif: IGif) =>
            <Col key={gif.id} xs={6} md={4} lg={3} className='mb-4'>
              <Image src={gif.images.fixed_width.url} alt="giphy image" data-testid="grid-giphy-image" fluid /> 
            </Col>
          )}
        </Row>
      }
    </>
  )
}

export default Grid