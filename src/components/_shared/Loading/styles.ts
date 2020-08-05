import styled from 'styled-components'
import { LoadingComponent, ContentLoadingComponent } from './doms'
import { Colors } from '../../../const/Colors'
import { Margin } from '../../../const/Margin'

export const LoadingStyle = styled(LoadingComponent)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${Colors.white};

  > div {
    margin-top: ${Margin.m8};
  }
`

export const ContentLoadingWrapperStyle = styled('div')`
  position: relative;
`

export const ContentLoadingStyle = styled(ContentLoadingComponent)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${Colors.white};

  > div {
    margin-top: ${Margin.m8};
  }
`
