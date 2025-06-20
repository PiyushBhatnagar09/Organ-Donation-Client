import './Testimonials.css';
import styled, { keyframes } from 'styled-components';

const glitterAnimation = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
`;

const GlitterText = styled.p`
  color: rgb(54, 152, 235);
  font-family: Arial, sans-serif;
  font-size: 30px;
  background-image: linear-gradient(45deg, #00f, #f0f, #0ff);
  background-size: 200% auto;
  animation: ${glitterAnimation} 2s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: 'Max Harper',
      designation: 'Patient',
      testimonial: 'I received exceptional care and support during my stay at the hospital. The medical staff went above and beyond to ensure my comfort and recovery. I am grateful for their expertise and compassion.',
      photo: 'https://www.realmenrealstyle.com/wp-content/uploads/2021/06/AOC.jpg'
    },
    {
      id: 2,
      name: 'Olivia Martinez',
      designation: 'Family Member',
      testimonial: 'Our experience with the hospital was outstanding. The doctors and nurses displayed professionalism and empathy throughout our loved one\'s treatment. They kept us well-informed and provided the highest quality of care.',
      photo: 'https://tse4.mm.bing.net/th/id/OIP.jnnuUvM0BLh9YdgE0z0ifQHaE8?rs=1&pid=ImgDetMain',
    },
    {
      id: 3,
      name: 'Elena Cruz',
      designation: 'Heart Transplant Doctor',
      testimonial: 'Working with the hospital\'s dedicated team has been a privilege. Their expertise in organ transplantation is unmatched, delivering successful outcomes. Witnessing the life-saving impact they make is truly inspiring.',
      photo: 'https://cdn.shopify.com/s/files/1/0636/7746/4821/articles/zariin-real-women-swati-bhargava.jpg?v=1666232248',
    },

    // Add more testimonials here
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-heading">TESTIMONIALS</h2>
      <p className="testimonials-subheading"><GlitterText>Our Voices</GlitterText></p>
      <div className="testimonials-container">
        {testimonialsData.map(testimonial => (
          <div className="testimonial-item" key={testimonial.id}>
            <p className="testimonial-text">{testimonial.testimonial}</p>
            <div className="testimonial-info">
              <img className="testimonial-image" src={testimonial.photo} alt="Testimonial" />
              <div>
                <h4 className="testimonial-name">{testimonial.name}</h4>
                <p className="testimonial-designation">{testimonial.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
