import { render, screen } from '@testing-library/react'
import Badge from '@/lib/components/Badge'

describe('Badge', () => {
  it('should load component and text', () => {
    render(<Badge color="green" text="Hello" />)
    const badgeElement = screen.getByText(/Hello/i)
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-green-500')
  })

  it('use default text and color if none are provided', () => {
    render(<Badge />)
    const badgeElement = screen.getByText(/yes/i)
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-blue-500')
  })
})
