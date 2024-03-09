import React, { Fragment } from "react"

export const ConditionalChildren = ({ conditional, children }: { conditional: boolean, children: React.ReactNode }) => {
  if (conditional) {
    return <Fragment>
      {children}
    </Fragment>
  }

  return <></>
}
