export interface ThemeSettings {
  backgroundColor: string;
  glowColor: string;
  buttonGlowColor: string;
  glowIntensity: number;
  animatedBorders: boolean;
  rainbowMode: boolean;
  borderWidth: number;
}

export const defaultTheme: ThemeSettings = {
  backgroundColor: '#1E1E1E',
  glowColor: '#40E0D0',
  buttonGlowColor: '#FF4D4D',
  glowIntensity: 0.5,
  animatedBorders: false,
  rainbowMode: false,
  borderWidth: 1,
};