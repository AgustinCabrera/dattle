import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

const testimonials = [
  {
    quote: "CattleTrack has transformed our ranch operations. We've seen a 20% increase in productivity since implementing the software.",
    author: "John Doe",
    role: "Ranch Owner",
    avatar: "/avatar/john-doe.webp",
  },
  {
    quote: "The health tracking features have been a game-changer for us. We've significantly reduced our veterinary costs.",
    author: "Jane Smith",
    role: "Dairy Farm Manager",
    avatar: "/avatar/jane-smith.jpg",
  },
  {
    quote: "The breeding management tools have helped us improve our herd genetics faster than we ever thought possible.",
    author: "Mike Johnson",
    role: "Cattle Breeder",
    avatar: "/avatar/mike-johnson.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50">
              <CardContent className="pt-6">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

