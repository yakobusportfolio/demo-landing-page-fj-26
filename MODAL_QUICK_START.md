# 🚀 Modal Quick Start - 60 Second Guide

## Copy-Paste This Code

```tsx
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

function YourComponent() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <button onClick={open}>Check Availability</button>
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

**That's it!** 🎉

---

## What You Get

✅ **Mobile-first modal** - Bottom sheet on phone, centered on desktop  
✅ **Form validation** - Name, phone, date, package  
✅ **Success/error feedback** - Toast notifications  
✅ **Smooth animations** - Professional slide-up  
✅ **Background scroll lock** - Proper modal behavior  
✅ **Keyboard support** - Close on Escape  

---

## File Locations

```
/src/app/components/CheckAvailabilityModal.tsx  ← Modal component
/src/app/hooks/useCheckAvailabilityModal.ts     ← State hook
/src/app/constants/images.ts                     ← Modal image
```

---

## Already Live In

- ✅ Hero Section (`/src/app/sections/HeroSection.tsx`)
- ✅ CTA Section (`/src/app/sections/CTASection.tsx`)

---

## Full Documentation

- **Component Guide**: `/MODAL_COMPONENT_GUIDE.md` (900+ lines)
- **Integration Examples**: `/MODAL_INTEGRATION_EXAMPLES.md` (10+ examples)
- **Implementation Summary**: `/MODAL_IMPLEMENTATION_SUMMARY.md`

---

## Replace Modal Image

1. Add your image: `/public/images/modal/couple-moment.jpg`
2. Update path in `/src/app/constants/images.ts`:
   ```typescript
   modal: {
     checkAvailability: "/images/modal/couple-moment.jpg",
   }
   ```
3. Done!

---

**Need help?** Read `/MODAL_COMPONENT_GUIDE.md`
