import Carousel from 'react-material-ui-carousel'
import Image from 'next/image'
import Link from 'next/link'

// 밸런스 탭 배너 사진들
import balancePageBanner1 from '../../public/asset/image/balancePageBanner1.png'
import balancePageBanner2 from '../../public/asset/image/balancePageBanner2.png'


interface Props {
  whereToUse: string
}

function MuiCarousel({ whereToUse }: Props) {
  switch (whereToUse) {
    case 'balanceBanner':
      return (
        <CustomCarousel>
          {
            [{ image: balancePageBanner1, src: '/balance/category' },
              { image: balancePageBanner2, src: '/balance/category' },
              { image: balancePageBanner1, src: '/balance/category' },
              { image: balancePageBanner2, src: '/balance/category' }].map((item, i) => (
              <Link key={i} href={item.src}>
                <a>
                  <Image src={item.image} />
                </a>
              </Link>
            ))
          }
        </CustomCarousel>
      )
    default:
      return (
        <p>오류</p>
      )
  }
}

function CustomCarousel({ children }: any) {
  return (
    <Carousel
      autoPlay={true}
      animation='slide'
      duration={3500}
      interval={20000}
      className='text-center'
      indicatorIconButtonProps={{
        style: {
          width: '0.375rem',
          height: '0.375rem',
          marginLeft: '6px',
          marginRight: '6px',
          color: '#E5E7EB'
        }
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: '#1C65D1' // 2
        }
      }}
      indicatorContainerProps={{
        style: {
          marginTop: '-6px',
          height: '24px'
        }
      }}
    >
      {children}
    </Carousel>
  )
}

export default MuiCarousel