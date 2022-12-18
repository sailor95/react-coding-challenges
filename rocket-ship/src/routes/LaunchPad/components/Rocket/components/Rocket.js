import React, { useState, PureComponent } from 'react'
import RocketCore from './RocketCore'

export const FunctionalRocket = React.memo(() => {
  const [initialLaunchTime] = useState(Date.now())

  return <RocketCore initialLaunchTime={initialLaunchTime} />
})

export class ClassRocket extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      initialLaunchTime: Date.now(),
    }
  }

  // NOTE: For extends
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps === this.props) return false
  // }

  render() {
    const { initialLaunchTime } = this.state

    return <RocketCore initialLaunchTime={initialLaunchTime} />
  }
}
