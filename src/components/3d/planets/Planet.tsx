import TechPlanet from './TechPlanet'
import type { Planet } from '../../../types/planet'

interface PlanetProps {
  planet: Planet
  onClick: () => void
  onHover: (hovered: boolean) => void
}

export default function Planet({ planet, onClick, onHover }: PlanetProps) {
  return <TechPlanet planet={planet} onClick={onClick} onHover={onHover} />
}